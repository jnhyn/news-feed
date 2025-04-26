'use client';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Link from 'next/link';
import { useThemeStore } from '../store/useThemeStore';
import SearchBar from './SearchBar';

export default function Header() {
  const darkMode = useThemeStore((state) => state.darkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

  return (
    <AppBar position='sticky' color='default' elevation={0}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link href='/'>
          <Typography fontWeight={900} fontSize={22}>
            📰 MyNews
          </Typography>
        </Link>
        <nav>
          <Link href='/'>Home</Link>&nbsp;|&nbsp;
          <Link href='/tags/webdev'>Tags</Link>&nbsp;|&nbsp;
          <Link href='/search'>Search</Link>&nbsp;|&nbsp;
          <Link href='/settings'>Settings</Link>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SearchBar />
          <IconButton
            color='inherit'
            onClick={toggleDarkMode}
            aria-label='toggle dark mode'
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
