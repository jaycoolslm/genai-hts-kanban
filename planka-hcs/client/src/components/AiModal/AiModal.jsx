import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Form,
  Modal,
  Message,
  Loader,
  TextArea,
  ButtonGroup,
  Header,
  Icon,
  Card,
} from 'semantic-ui-react';
import { Markdown } from '../../lib/custom-ui';

import { useForm } from '../../hooks';

import styles from './AiModal.module.scss';

const AiModal = React.memo(({ stateData, onRegenerate, onCreate, onProjectCreate, onClose }) => {
  const [t] = useTranslation();
  const [cardAction, setCardAction] = React.useState('chat');

  const messageContentField = useRef(null);

  const handleCardClick = (action) => {
    setCardAction(action);
    if (action === 'getQuestionary') {
      onCreate({
        role: 'user',
        content: 'Give me a questionary that I can fill out to create a project.',
        action: 'getQuestionary',
      });
    }
  };

  // form data for submitting project
  const handleProjectSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const { content } = stateData.messages.at(-1);

      const cleanData = {
        content: content.trim(),
      };

      if (!cleanData.content) {
        messageContentField.current.ref.current.select();
        return;
      }

      onProjectCreate(cleanData);
    },
    [onProjectCreate, stateData],
  );

  const [data, handleFieldChange] = useForm(() => ({
    messageContent: '',
  }));

  // form data for AI Chat messages
  const handleMessageSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const message = {
        role: 'user',
        content: data.messageContent.trim(),
        action: 'chat',
      };

      if (!message.content) {
        messageContentField.current.ref.current.select();
        return;
      }

      onCreate(message);
      setCardAction('chat');
      handleFieldChange(undefined, { name: 'messageContent', value: '' });
    },
    [onCreate, data, handleFieldChange],
  );

  const handleCopy = useCallback((content) => {
    navigator.clipboard.writeText(content);
  }, []);

  useEffect(() => {
    // Auto resize textarea
    messageContentField.current.ref.current.style.height = 'auto';
    messageContentField.current.ref.current.style.height = `${messageContentField.current.ref.current.scrollHeight + 2}px`;
  }, [data.messageContent]);

  useEffect(() => {
    messageContentField.current.focus();
  }, []);

  return (
    <Modal open closeIcon size="large" onClose={onClose}>
      <Modal.Header>
        {t('common.createProjectWithAi', {
          context: 'title',
        })}
      </Modal.Header>

      <Modal.Content scrolling className={styles['modal-content']}>
        {stateData.messages.length === 0 && (
          <Card.Group centered>
            <Card
              onClick={() => handleCardClick('getQuestionary')}
              header="Need help? Get a short questionary."
              meta="&nbsp;"
              description="Tell us about your project and Ai will generate the user stories and tasks for your project."
            />
            <Card
              onClick={() => messageContentField.current.ref.current.select()}
              header="Already have a feature specification?"
              meta="&nbsp;"
              description="Drop it below and Ai will generate the user stories and tasks for your a project."
            />
          </Card.Group>
        )}

        {stateData?.messages.map((message) => (
          <div
            className={
              styles[
                message.role === 'user' ? 'message-container-request' : 'message-container-response'
              ]
            }
            key={message.id}
          >
            <div
              className={
                styles[
                  message.role === 'user' ? 'message-wrapper-request' : 'message-wrapper-response'
                ]
              }
            >
              {message.role === 'assistant' && (
                <Header className={styles['message-header']} as="h4">
                  Assistant:
                </Header>
              )}
              <Message className={styles['message-no-margin']} floating compact>
                <Markdown>{message.content}</Markdown>
              </Message>
              {message.role === 'user' ? (
                <Button
                  circular
                  basic
                  icon="edit"
                  size="mini"
                  className={styles['message-button']}
                />
              ) : (
                <ButtonGroup basic size="mini" className={styles['message-button']}>
                  <Button icon="copy outline" onClick={() => handleCopy(message.content)} />
                  <Button icon="sync alternate" onClick={onRegenerate} />
                </ButtonGroup>
              )}
            </div>
          </div>
        ))}
        {stateData.isSubmitting && (
          <>
            <Header className={styles['message-header']} as="h4">
              Assistant:
            </Header>
            <Message floating compact>
              <Icon name="spinner" size="large" loading />
              <span>{stateData.isSubmittingMessage}</span>
            </Message>
          </>
        )}

        {stateData.hasError && (
          <>
            <Header className={styles['message-header']} as="h4">
              Assistant:
            </Header>
            <Message
              size="small"
              floating
              compact
              negative
              header="Something went wrong while generating the response."
              content="Please try again. If this issue persists please contact us."
            />
          </>
        )}

        {stateData.messages.length > 1 &&
          cardAction !== 'getQuestionary' &&
          !stateData.isSubmitting && (
            <Form onSubmit={handleProjectSubmit} className={styles['message-container-request']}>
              <Button color="green" basic size="large">
                <Icon name="check" />I like these user stories, create a project with them
              </Button>
            </Form>
          )}
      </Modal.Content>
      <Modal.Actions>
        {/* <p>{t('common.enterProjectTitle')}</p> */}
        {stateData.hasError ? (
          <div className={styles['form-error-container']}>
            <Header as="h4">There was an error generating a response</Header>
            <Button circular secondary onClick={onRegenerate} className={styles['submit-button']}>
              Regenerate
            </Button>
          </div>
        ) : (
          <Form onSubmit={handleMessageSubmit}>
            <div className={styles['form-content-wrapper']}>
              <div className={styles['form-content']}>
                <div className={styles['textarea-wrapper']}>
                  <TextArea
                    rows={1}
                    ref={messageContentField}
                    placeholder={t('common.enterMessage')}
                    name="messageContent"
                    value={data.messageContent}
                    disabled={stateData.isSubmitting}
                    className={styles.textarea}
                    onChange={handleFieldChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleMessageSubmit(e);
                      }
                    }}
                  />
                </div>

                <div>
                  <Button
                    secondary
                    circular
                    className={styles['submit-button']}
                    size="medium"
                    icon={stateData.isSubmitting ? 'stop' : 'arrow up'}
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Modal.Actions>
    </Modal>
  );
});

AiModal.propTypes = {
  stateData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onRegenerate: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  onProjectCreate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AiModal;
