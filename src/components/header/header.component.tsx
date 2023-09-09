import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'

import styles from './header-styles.module.css';
import { ButtonTypesEnum, ButtonUI } from '../ui/button.ui';
import { showDialog } from '../../store/dialog.slice';
import { DialogContent } from '../ui/dialog.ui';
import { useAppDispatch } from '../../store/store';

interface HaederComponentProps {
  isGameStarted: boolean;
  stopGame: () => void;
}

export const HeaderComponent: React.FC<HaederComponentProps> = memo(function HaederComponent({
  isGameStarted, stopGame
}) {
  const dispatch = useAppDispatch();

  const openConfigDialog = () => {
    dispatch(showDialog({
      content: DialogContent.CONFIG_BOARD,
    }));
  }

  return (
    <header className={styles.header}>
      {isGameStarted && <ButtonUI label='Stop Game' handleClick={stopGame} style={ButtonTypesEnum.ERROR} />}

      <ButtonUI handleClick={openConfigDialog} style={ButtonTypesEnum.SECONDARY}>
        <FontAwesomeIcon className={styles.gearIcon} icon={faGear} />
      </ButtonUI>
    </header>
  );
});
