// Libs
import React from 'react';
import { Button } from 'semantic-ui-react';
import classNames from 'classnames';

// Styles
import styles from './OAuthOverlay.module.scss';

const OAuthOverlay = () => {
    const openLink = (event: React.MouseEvent) => {
        const target = event.target as HTMLElement;
        const ctaButton = target.closest('.js-cta-link');

        if (ctaButton && ctaButton instanceof HTMLElement) {
            const link = ctaButton.dataset.link;
            if (link) {
                window.location.href = link;
            }
        }
    };
    return (
        <div className={styles.OAuthOverlay} data-test="oauth-overlay">
            <h2 className={styles.title}>Authorization required 🔐</h2>
            <div className={styles.section}>
                <p className={styles.notice}>
                    To view and edit your Harvest time entries on this website, you will have to
                    allow us to access your account. This is done through the OAuth workflow
                    provided by Harvest.
                    <br />
                    <br />
                    The link below takes you to the official Harvest website, where you can
                    authorize us to request access tokens for your account. They will then be sent
                    back to you, encoded. During your session, the website will decode them to
                    access your account. The tokens are only stored inside your browser, as cookies.
                    <br />
                    <br />
                    For additional info on the process, feel free to visit our GitHub repository 🐙
                    <a
                        className={styles['repo-link']}
                        href="https://github.com/vincentrohde/harvest-dashboard"
                    >
                        https://github.com/vincentrohde/harvest-dashboard
                    </a>
                </p>
                <Button
                    className={classNames(styles['cta-link'], 'js-cta-link')}
                    content={
                        <a
                            href={`https://id.getharvest.com/oauth2/authorize?client_id=${process.env.OAUTH_APP_ID}&response_type=token`}
                        >
                            Authorize application
                        </a>
                    }
                    icon="right arrow"
                    onClick={openLink}
                    data-link={`https://id.getharvest.com/oauth2/authorize?client_id=${process.env.OAUTH_APP_ID}&response_type=token`}
                    data-test="authorize-app"
                    primary
                    labelPosition="right"
                />
            </div>

            <div className={styles.section}>
                <h3 className={styles['section-title']}>Create new account ⏰</h3>
                <p className={styles.notice}>
                    If you currently have no Harvest account, you can easily create one for
                    yourself. The link below will take you to the official Harvest website, where
                    you can register a new personal account.
                </p>
                <Button
                    className={classNames(styles['cta-link'], 'js-cta-link')}
                    content={<a href="https://www.getharvest.com">Create new account</a>}
                    onClick={openLink}
                    data-link="https://www.getharvest.com"
                    data-test="create-account"
                    icon="right arrow"
                    primary
                    labelPosition="right"
                />
            </div>
        </div>
    );
};

export default OAuthOverlay;
