import React, { JSX } from 'react';

// Importing all 78 icons from @mui/icons-material used in the project
import {
  Dashboard, Adjust, BarChart, BusinessCenter, People, PersonAdd, Article, Assignment, CheckBox, Event,
  AccessTime, DataUsage, PieChart, Settings, Folder, FolderShared, AccountBalanceWallet, AccountBalance, TrendingUp, EmojiEvents,
  Bookmark, BugReport, Business, Storage, AttachMoney, Flag, GridView, PlaylistAddCheck, FactCheck, NoteAdd,
  EditNote, FolderZip, Mail, Chat, Phone, Archive, Shield, Tune, Star, Label,
  CheckCircle, Info, Help, Delete, Edit, AddBox, Search, FilterList,
  Home, Menu, Forum, NetworkWifi, Slideshow, ViewKanban, FormatListBulleted, Timeline, ManageAccounts,
  BackupTable, Calculate, CameraAlt, DriveEta, Contacts, CreditCard, EmojiPeople, CurrencyBitcoin, Album,
  FileDownload, Interests, FitnessCenter, Code, Coffee, Explore, ContentCopy, Copyright,
  DeveloperBoard, MyLocation, Close, Circle // Circle is kept as a default
} from '@mui/icons-material';

export const getIconComponent = (
  iconName: string,
  textColor?: string,
  fontSize?: string
): JSX.Element => {
  // Default values from your image, matching the orange theme
  const defaultFontSize = "27px";
  const defaultTextColor = "text-orange-600";

  // Props object from your image logic
  const iconProps = {
    sx: { fontSize: fontSize || defaultFontSize },
    className: `${defaultTextColor} ${textColor || ""}`.trim(),
  };

  // Switch statement populated with all 78 icons from allIcons.tsx
  switch (iconName) {
    case "Dashboard":
      return <Dashboard {...iconProps} />;
    case "Adjust":
      return <Adjust {...iconProps} />;
    case "BarChart":
      return <BarChart {...iconProps} />;
    case "BusinessCenter":
      return <BusinessCenter {...iconProps} />;
    case "People":
      return <People {...iconProps} />;
    case "PersonAdd":
      return <PersonAdd {...iconProps} />;
    case "Article":
      return <Article {...iconProps} />;
    case "Assignment":
      return <Assignment {...iconProps} />;
    case "CheckBox":
      return <CheckBox {...iconProps} />;
    case "Event":
      return <Event {...iconProps} />;
    case "AccessTime":
      return <AccessTime {...iconProps} />;
    case "DataUsage":
      return <DataUsage {...iconProps} />;
    case "PieChart":
      return <PieChart {...iconProps} />;
    case "Settings":
      return <Settings {...iconProps} />;
    case "Folder":
      return <Folder {...iconProps} />;
    case "FolderShared":
      return <FolderShared {...iconProps} />;
    case "AccountBalanceWallet":
      return <AccountBalanceWallet {...iconProps} />;
    case "AccountBalance":
      return <AccountBalance {...iconProps} />;
    case "TrendingUp":
      return <TrendingUp {...iconProps} />;
    case "EmojiEvents":
      return <EmojiEvents {...iconProps} />;
    case "Bookmark":
      return <Bookmark {...iconProps} />;
    case "BugReport":
      return <BugReport {...iconProps} />;
    case "Business":
      return <Business {...iconProps} />;
    case "Storage":
      return <Storage {...iconProps} />;
    case "AttachMoney":
      return <AttachMoney {...iconProps} />;
    case "Flag":
      return <Flag {...iconProps} />;
    case "GridView":
      return <GridView {...iconProps} />;
    case "PlaylistAddCheck":
      return <PlaylistAddCheck {...iconProps} />;
    case "FactCheck":
      return <FactCheck {...iconProps} />;
    case "NoteAdd":
      return <NoteAdd {...iconProps} />;
    case "EditNote":
      return <EditNote {...iconProps} />;
    case "FolderZip":
      return <FolderZip {...iconProps} />;
    case "Mail":
      return <Mail {...iconProps} />;
    case "Chat":
      return <Chat {...iconProps} />;
    case "Phone":
      return <Phone {...iconProps} />;
    case "Archive":
      return <Archive {...iconProps} />;
    case "Shield":
      return <Shield {...iconProps} />;
    case "Tune":
      return <Tune {...iconProps} />;
    case "Star":
      return <Star {...iconProps} />;
    case "Label":
      return <Label {...iconProps} />;
    case "CheckCircle":
      return <CheckCircle {...iconProps} />;
    case "Info":
      return <Info {...iconProps} />;
    case "Help":
      return <Help {...iconProps} />;
    case "Delete":
      return <Delete {...iconProps} />;
    case "Edit":
      return <Edit {...iconProps} />;
    case "AddBox":
      return <AddBox {...iconProps} />;
    case "Search":
      return <Search {...iconProps} />;
    case "FilterList":
      return <FilterList {...iconProps} />;
    case "Home":
      return <Home {...iconProps} />;
    case "Menu":
      return <Menu {...iconProps} />;
    case "Forum":
      return <Forum {...iconProps} />;
    case "NetworkWifi":
      return <NetworkWifi {...iconProps} />;
    case "Slideshow":
      return <Slideshow {...iconProps} />;
    case "ViewKanban":
      return <ViewKanban {...iconProps} />;
    case "FormatListBulleted":
      return <FormatListBulleted {...iconProps} />;
    case "Timeline":
      return <Timeline {...iconProps} />;
    case "ManageAccounts":
      return <ManageAccounts {...iconProps} />;
    case "BackupTable":
      return <BackupTable {...iconProps} />;
    case "Calculate":
      return <Calculate {...iconProps} />;
    case "CameraAlt":
      return <CameraAlt {...iconProps} />;
    case "DriveEta":
      return <DriveEta {...iconProps} />;
    case "Contacts":
      return <Contacts {...iconProps} />;
    case "CreditCard":
      return <CreditCard {...iconProps} />;
    case "EmojiPeople":
      return <EmojiPeople {...iconProps} />;
    case "CurrencyBitcoin":
      return <CurrencyBitcoin {...iconProps} />;
    case "Album":
      return <Album {...iconProps} />;
    case "FileDownload":
      return <FileDownload {...iconProps} />;
    case "Interests":
      return <Interests {...iconProps} />;
    case "FitnessCenter":
      return <FitnessCenter {...iconProps} />;
    case "Code":
      return <Code {...iconProps} />;
    case "Coffee":
      return <Coffee {...iconProps} />;
    case "Explore":
      return <Explore {...iconProps} />;
    case "ContentCopy":
      return <ContentCopy {...iconProps} />;
    case "Copyright":
      return <Copyright {...iconProps} />;
    case "DeveloperBoard":
      return <DeveloperBoard {...iconProps} />;
    case "MyLocation":
      return <MyLocation {...iconProps} />;
    case "Close":
      return <Close {...iconProps} />;
    case "Circle":
      return <Circle {...iconProps} />;
    default:
        console.warn(`Icon "${iconName}" not found. Using Help icon as default.`);
      return <Help {...iconProps} />;
  }
};
