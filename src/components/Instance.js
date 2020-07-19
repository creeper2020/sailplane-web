import React from 'react';
import {errorColor, primary, primary2, primary3, primary45} from '../colors';
import {ToolItem} from './ToolItem';
import {FiShare2, FiCopy, FiTrash} from 'react-icons/fi';
import {FiHardDrive} from 'react-icons/fi/index';
import {useDispatch} from 'react-redux';
import {setStatus} from '../actions/tempData';

export const Instance = React.memo(
  ({data, selected, onClick, onDelete, instanceIndex}) => {
    const {name, address, isImported} = data;
    const dispatch = useDispatch();

    const backgroundColor = selected ? primary3 : '#FFF';

    const styles = {
      outer: {
        backgroundColor: backgroundColor,
        border: `1px solid ${primary3}`,
        borderTop: instanceIndex === 0 ? `1px solid ${primary2}` : 0,
        borderBottom: `1px solid ${primary2}`,
        borderRight: 0,
        borderLeft: 0,
        color: selected ? '#fff' : primary45,
        padding: 6,
        paddingTop: 6,
        fontFamily: 'Open Sans',
        cursor: 'pointer',
        borderRadius: 3,
      },
      container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      address: {
        fontSize: 14,
        overflow: 'hidden',
        width: '40%',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      tools: {
        display: 'flex',
        justifyContent: 'flex-end',
      },
      toolItem: {
        marginLeft: 10,
      },
      name: {
        fontSize: 16,
        lineHeight: '19px',
        display: 'flex',
        alignItems: 'center',
      },
      icon: {
        marginRight: 4,
      },
      importedTxt: {
        marginLeft: 6,
        fontSize: 14,
      },
    };

    const shareURL = `${
      window.location.origin + window.location.pathname
    }#/importInstance/${encodeURIComponent(address)}`;

    return (
      <div
        className={'drive'}
        style={styles.outer}
        onClick={(event) => {
          event.stopPropagation();
          onClick();
        }}>
        <div style={styles.container}>
          <div style={styles.name}>
            <FiHardDrive
              className={'shareIcon'}
              color={selected ? '#FFF' : primary45}
              size={15}
              style={styles.icon}
            />
            {name}
            {isImported ? (
              <span style={styles.importedTxt}>[imported]</span>
            ) : null}
          </div>
          <div style={styles.tools}>
            <div style={styles.toolItem}>
              <ToolItem
                defaultColor={selected ? '#fff' : primary45}
                iconComponent={FiShare2}
                size={15}
                changeColor={primary}
                onClick={async () => {
                  await navigator.clipboard.writeText(shareURL);
                  dispatch(
                    setStatus({
                      message: 'Drive URL copied to clipboard',
                      isInfo: true,
                    }),
                  );
                  setTimeout(() => dispatch(setStatus({})), 1500);
                }}
              />
            </div>
            <div style={styles.toolItem}>
              <ToolItem
                defaultColor={selected ? '#fff' : primary45}
                iconComponent={FiCopy}
                size={15}
                changeColor={primary}
                onClick={async () => {
                  await navigator.clipboard.writeText(address);
                  dispatch(
                    setStatus({
                      message: 'Drive address copied to clipboard',
                      isInfo: true,
                    }),
                  );
                  setTimeout(() => dispatch(setStatus({})), 1500);
                }}
              />
            </div>
            <div style={styles.toolItem}>
              <ToolItem
                className={'instanceDelete'}
                defaultColor={selected ? '#fff' : primary45}
                iconComponent={FiTrash}
                size={15}
                changeColor={errorColor}
                onClick={() => onDelete()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
);
