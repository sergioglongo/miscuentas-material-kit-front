import type { ButtonBaseProps } from '@mui/material/ButtonBase';

import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import MenuList from '@mui/material/MenuList';
import ButtonBase from '@mui/material/ButtonBase';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { varAlpha } from 'src/theme/styles';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { setUnitActive } from 'src/redux/slices/units.slice';
import { updateParams } from 'src/redux/slices/user.slice';
import UnitIcon from 'src/components/icon/unit-icons';
import { IUnit, IUser } from 'src/config/types/types';

// ----------------------------------------------------------------------

export type WorkspacesPopoverProps = ButtonBaseProps & {
  unitActive: any,
  setUnitActiveData: any,
  updateUnitActive: any,
  user: any,
  data?: {
    id: string;
    name: string;
    logo: string;
    main: boolean;
    is_main_unit: boolean;
  }[];
};

function WorkspacesPopover({ data = [], sx, unitActive, setUnitActiveData, updateUnitActive, user, ...other }: WorkspacesPopoverProps) {

  const [workspace, setWorkspace] = useState(unitActive?.id ? unitActive : data[0]);

  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleChangeWorkspace = useCallback(
    (newValue: (typeof data)[number]) => {
      setWorkspace(newValue);
      setUnitActiveData(newValue)
      updateUnitActive({ unitActive: newValue });
      handleClosePopover();
    },
    [handleClosePopover, setUnitActiveData, updateUnitActive]
  );

  const renderAvatar = (alt: string, src: string) => (
    <UnitIcon iconName={src} styles={{ color: '#343434FF' }} />
    // <Box component="img" alt={alt} src={src} sx={{ width: 24, height: 24, borderRadius: '50%' }} />
  );
  useEffect(() => {
    if (unitActive?.id) {
      data.forEach((unit) => {
        if (unit.id === unitActive.id.toString()) {
          setWorkspace(unit)
          console.log("establecer unidad elegida", unit);
          setUnitActiveData(unit)
          updateUnitActive({ unitActive: unit });
          console.log("se establece la unidad activa", unitActive);
          
        }
      })
    } else if(user.isAuthorized){
      const newValue = data.find(item => item.is_main_unit);
      console.log("Se establece l a unidad principal", newValue);
      setWorkspace(newValue)
      setUnitActiveData(newValue)
      updateUnitActive({ unitActive: newValue });
    } 
  }, [unitActive, data, setUnitActiveData, updateUnitActive, user.isAuthorized])

  // useEffect(() => {
  //   if (data && data.length > 0) {
  //     data.forEach((unit) => {
  //       if (unit.main) {
  //         setWorkspace(unit)
  //         setUnitActiveData(unit)
  //         console.log("unit main", unit);


  //       }
  //     })
  //   }
  // }, [data, setUnitActiveData])

  return (
    <>
      <ButtonBase
        disableRipple
        onClick={handleOpenPopover}
        sx={{
          pl: 2,
          py: 2,
          gap: 1.5,
          pr: 1.5,
          width: 1,
          borderRadius: 1.5,
          textAlign: 'left',
          justifyContent: 'flex-start',
          bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
          ...sx,
        }}
        {...other}
      >
        {renderAvatar(workspace?.name, workspace?.logo)}

        <Box
          gap={1}
          flexGrow={1}
          display="flex"
          alignItems="center"
          sx={{ typography: 'body2', fontWeight: 'fontWeightSemiBold' }}
        >
          {workspace?.name}
          {/* {renderLabel(workspace?.plan)} */}
        </Box>

        <Iconify width={16} icon="carbon:chevron-sort" sx={{ color: 'text.disabled' }} />
      </ButtonBase>

      <Popover open={!!openPopover} anchorEl={openPopover} onClose={handleClosePopover}>
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 260,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              p: 1.5,
              gap: 1.5,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: {
                bgcolor: 'action.selected',
                fontWeight: 'fontWeightSemiBold',
              },
            },
          }}
        >
          {data.map((option) => (
            <MenuItem
              key={option.id}
              // selected={unitActive ? option.id === unitActive.id.toString() : option.id === workspace?.id}
              selected={option.id === workspace?.id}
              onClick={() => handleChangeWorkspace(option)}
            >
              {renderAvatar(option.name, option.logo)}
              {/* <UnitIcon unit={option.photo} styles={{ fontSize: 40, color: 'black', borderRadius: '5px', boxShadow: '0px 0px 5px rgba(0,0,0,0.2)', padding: '5px' }} />  */}
              <Box component="span" sx={{ flexGrow: 1 }}>
                {option.name}
              </Box>

              {/* {renderLabel(option.plan)} */}
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  unitActive: state.units.unitActive,
  user: state.user
})
const mapDispatchToProps = (dispatch: any) => ({
  setUnitActiveData: bindActionCreators(setUnitActive, dispatch),
  updateUnitActive: bindActionCreators(updateParams, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkspacesPopover);