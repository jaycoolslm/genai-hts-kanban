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
} from 'semantic-ui-react';
import { Markdown } from '../../lib/custom-ui';

import { useForm } from '../../hooks';

import styles from './AiModal.module.scss';

const AiModal = React.memo(
  ({
    stateData = { messages: [], isSubmitting: false },
    onRegenerate,
    onCreate,
    onProjectCreate,
    isSubmitting,
    onClose,
  }) => {
    const [t] = useTranslation();

    const messageContentField = useRef(null);

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

    // form data for AI Chat messages
    const [data, handleFieldChange] = useForm(() => ({
      messageContent: '',
    }));

    const handleMessageSubmit = useCallback(
      (e) => {
        e.preventDefault();

        const message = {
          role: 'user',
          content: data.messageContent.trim(),
        };

        if (!message.content) {
          messageContentField.current.ref.current.select();
          return;
        }

        onCreate(message);
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
          {stateData?.messages.map((message) => (
            <div
              className={
                styles[
                  message.role === 'user'
                    ? 'message-container-request'
                    : 'message-container-response'
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
                <Loader active size="tiny" inverted />
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

          {stateData.messages.length > 1 && (
            <Form onSubmit={handleProjectSubmit} className={styles['message-container-request']}>
              <Button
                inverted
                color="green"
                icon="checkmark"
                content={t('action.createProject')}
                floated="right"
                loading={isSubmitting}
                disabled={isSubmitting}
              />
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
  },
);

AiModal.propTypes = {
  stateData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onRegenerate: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  onProjectCreate: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AiModal;
