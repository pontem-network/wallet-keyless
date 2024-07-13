import { PropsWithChildren, ReactNode } from 'react';

import cn from 'classnames';

import ArrowBack from '../../../assets/arrow-back.svg';
import PontemLogo from '../../../assets/pontem.svg';
import { PONTEM_HELP_URL, PONTEM_URL } from '../../constants/routes';

import styles from './simple-layout.module.scss';

interface ISimpleLayoutProps {
  className?: string;
  navigateBackLink?: string | boolean;
  header?: ReactNode;
  onBackClick?: () => void;
}

export const SimpleLayout = ({ children, className, navigateBackLink, header, onBackClick }: PropsWithChildren<ISimpleLayoutProps>) => {
  const hasBackButton = !!navigateBackLink;
  const to = (typeof navigateBackLink === 'boolean' ? undefined : navigateBackLink);

  const back = () => {
    if (onBackClick) {
      onBackClick();
      return;
    }
    if (to) {
      window.location.href = to;
      return;
    }
    window.history.back()
  }

  return (
    <>
        <div className={cn(styles.navigationLine)}>
          <a
            href={PONTEM_URL}
            rel='noreferrer'
            target='_blank'
            className={styles.logo}
          >
            <img src={PontemLogo} />
          </a>

          <a
            href={PONTEM_HELP_URL}
            rel='noreferrer'
            target='_blank'
            className={styles.help}
          >
            <span>?</span>
            <p>{'Help'}</p>
          </a>
        </div>

      <div className={cn(styles.container, className, hasBackButton && styles.hasBackButton, styles.inPopup)}>
        {(!!hasBackButton || !!header) && (
          <div className={styles.header}>
            {hasBackButton && (
              <div
                className={styles.backButton}
                onClick={back}
              >
                <img src={ArrowBack} />
              </div>
            )}
            {!!header && <div className={styles.headerName}>{header}</div>}
          </div>
        )}
        {children}
      </div>
    </>
  );
};

export default SimpleLayout;
