import { ReactElement, memo, useCallback, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './dialog-styles.module.css';
import { getDialogSelector } from '../../store/selectors/dialog.selectors';
import { hideDialog } from '../../store/dialog.slice';
import { ButtonTypesEnum, ButtonUI } from './button.ui';
import { ConfidGame } from '../modals/config-game.component';
import { useAppDispatch, useAppSelector } from '../../store/store';

export enum DialogContent {
  CONFIG_BOARD = 1,
}

const modals: { [key in DialogContent]: ReactElement } = {
  [DialogContent.CONFIG_BOARD]: <ConfidGame />,
};

export const DialogUI: React.FC = memo(function DialogUI() {
  const { active, content } = useAppSelector(getDialogSelector);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const dispatch = useAppDispatch();

  const closeDialog = useCallback(() => {
    dispatch(hideDialog());
  }, [dispatch]);

  useEffect(() => {
    if (dialogRef.current && active) {
      if (active) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [dialogRef, active]);

  if (!content) {
    return null;
  }

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <div className={styles.header}>
        <h2 className={styles.title}>Settings</h2>
        <ButtonUI handleClick={closeDialog} style={ButtonTypesEnum.TRANSPARENT}>
          <FontAwesomeIcon className={styles.closeIcon} icon={faXmark} />
        </ButtonUI>
      </div>
      <div className={styles.content}>{modals[content]}</div>
    </dialog>
  );
});
