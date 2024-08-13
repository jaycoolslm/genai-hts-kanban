import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button, Form, Modal, Message, Loader, TextArea } from 'semantic-ui-react';
import { Input, Markdown } from '../../lib/custom-ui';

import { useForm } from '../../hooks';

import styles from './AiModal.module.scss';

const AiModal = React.memo(
  ({ stateData = { messages: [], isSubmitting: false }, onCreate, onClose }) => {
    const [t] = useTranslation();

    const messageContentField = useRef(null);

    const [data, handleFieldChange] = useForm(() => ({
      messageContent: '',
    }));

    const handleSubmit = useCallback(
      (e) => {
        e.preventDefault();

        const message = {
          role: 'user',
          content: data.messageContent.trim(),
        };

        if (!message.content) {
          messageContentField.current.select();
          return;
        }

        onCreate(message);
        handleFieldChange(undefined, { name: 'messageContent', value: '' });
      },
      [onCreate, data, handleFieldChange],
    );

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
          {stateData?.messages.map((item) => (
            <div
              className={
                styles[item.role === 'user' ? 'message-container-right' : 'message-container-left']
              }
              key={item.id}
            >
              <Message floating compact>
                <Markdown>{item.content}</Markdown>
              </Message>
            </div>
          ))}
          {stateData.isSubmitting && (
            <Message floating compact>
              <Markdown>
                <Loader active size="tiny" inverted />
              </Markdown>
            </Message>
          )}
        </Modal.Content>
        <Modal.Actions>
          {/* <p>{t('common.enterProjectTitle')}</p> */}
          <Form onSubmit={handleSubmit}>
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
                        handleSubmit(e);
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
                    icon="arrow up"
                    // disabled={stateData.isSubmitting}
                  />
                </div>
              </div>
            </div>
          </Form>
        </Modal.Actions>
      </Modal>
    );
  },
);

AiModal.propTypes = {
  stateData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onCreate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AiModal;
