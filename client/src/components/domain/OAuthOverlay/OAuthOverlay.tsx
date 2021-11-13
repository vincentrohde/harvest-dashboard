// Libs
import React from 'react';
import {Button} from 'semantic-ui-react';

// Styles
import './OAuthOverlay.scss';

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
        <div className="OAuthOverlay">
            <h2 className="title">Authorization required 🔐</h2>
            <div className="section">
                <p className="notice">
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
                        className="repo-link"
                        href="https://github.com/vincentrohde/harvest-dashboard"
                    >
                        https://github.com/vincentrohde/harvest-dashboard
                    </a>
                </p>
                <Button
                    className="cta-link js-cta-link"
                    content={
                        <a
                            href={`https://id.getharvest.com/oauth2/authorize?client_id=${process.env.OAUTH_APP_ID}&response_type=code`}
                        >
                            Authorize application
                        </a>
                    }
                    icon="right arrow"
                    onClick={openLink}
                    data-link={`https://id.getharvest.com/oauth2/authorize?client_id=${process.env.OAUTH_APP_ID}&response_type=code`}
                    primary
                    labelPosition="right"
                />
            </div>

            <div className="section">
                <h3 className="section-title">Create new account ⏰</h3>
                <p className="notice">
                    If you currently have no Harvest account, you can easily create one for
                    yourself. The link below will take you to the official Harvest website, where
                    you can register a new personal account.
                </p>
                <Button
                    className="cta-link js-cta-link"
                    content={<a href="https://www.getharvest.com">Create new account</a>}
                    onClick={openLink}
                    data-link="https://www.getharvest.com"
                    icon="right arrow"
                    primary
                    labelPosition="right"
                />
            </div>
        </div>
    );
};

export default OAuthOverlay;
