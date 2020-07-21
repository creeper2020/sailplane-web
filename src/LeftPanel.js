import React, {useState} from 'react';
import {primary2, primary45} from './colors';
import {FaFolderOpen, FaCog, FaBars, FaServer, FaTimes} from 'react-icons/fa';
import {PanelItem} from './components/PanelItem';
import {useIsMobile} from './hooks/useIsMobile';
import {FaGithub} from 'react-icons/fa/index';

const styles = {
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: primary45,
    color: '#FFF',
    padding: '20px 10px',
    minWidth: 200,
    fontFamily: 'Open Sans',
    paddingBottom: 0,
  },
  logo: {
    display: 'inline-block',
    fontFamily: 'MuseoModerno',
    color: '#FFF',
    fontSize: 24,
    fontWeight: 400,
    marginBottom: 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
    cursor: 'pointer',
    lineHeight: '24px',
  },
  settingsBlock: {
    bottom: 0,
    width: '100%',
  },
  mobilePadding: {
    paddingBottom: 6,
  },
  menuIcon: {
    position: 'absolute',
    top: 25,
    left: 14,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 13,
    lineHeight: '14px',
    fontFamily: 'Open Sans',
  },
  iconGithub: {
    cursor: 'pointer',
  },
  githubTxt: {
    fontSize: 10,
    userSelect: 'none',
  },
  icon: {
    width: 43.4,
    height: 20,
    marginRight: 4,
  },
  logoTitle: {
    display: 'inline-flex',
  },
};

export function LeftPanel({setCurrentRightPanel, currentRightPanel}) {
  const isMobile = useIsMobile();

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  let iconComponent = FaBars;
  if (isMobileOpen) {
    iconComponent = FaTimes;
  }

  const IconComponent = iconComponent;

  return (
    <div style={styles.container}>
      {isMobile ? (
        <IconComponent
          color={'#FFF'}
          size={24}
          style={styles.menuIcon}
          onClick={() => {
            setIsMobileOpen(!isMobileOpen);
          }}
        />
      ) : null}
      <div>
        <div style={styles.logoContainer}>
          <div
            style={styles.logo}
            onClick={() => {
              document.location = `${
                window.location.origin + window.location.pathname
              }`;
            }}>
            <img src={'/images/origami2.png'} style={styles.icon} width={20} />
            <div style={styles.logoTitle}>Sailplane</div>
          </div>
        </div>
        {isMobileOpen || !isMobile ? (
          <>
            <PanelItem
              title={'Files'}
              iconComponent={FaFolderOpen}
              selected={currentRightPanel === 'files'}
              onClick={() => setCurrentRightPanel('files')}
            />
            <PanelItem
              title={'Drives'}
              iconComponent={FaServer}
              selected={currentRightPanel === 'instances'}
              onClick={() => setCurrentRightPanel('instances')}
            />

            <div style={styles.settingsBlock}>
              <PanelItem
                title={'Settings'}
                selected={currentRightPanel === 'settings'}
                onClick={() => setCurrentRightPanel('settings')}
                iconComponent={FaCog}
              />
            </div>
          </>
        ) : (
          <div style={styles.mobilePadding} />
        )}
      </div>
      {!isMobile ? (
        <div style={styles.footer}>
          <a
            href={'https://github.com/cypsela/sailplane-web'}
            target={'_blank'}>
            <FaGithub color={primary2} size={20} style={styles.iconGithub} />
          </a>
          <div style={styles.githubTxt}>Source</div>
        </div>
      ) : null}
    </div>
  );
}
