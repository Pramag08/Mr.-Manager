import React, { useState } from 'react';
import { IconData } from '@/app/Pages/types/AppType';
import { useContextApp } from '@/app/Pages/ContextApp';

import {
  Dashboard, Adjust, BarChart, BusinessCenter, People, PersonAdd, Article, Assignment, CheckBox, Event, // Changed Target->Adjust, Briefcase->BusinessCenter
  AccessTime, DataUsage, PieChart, Settings, Folder, FolderShared, AccountBalanceWallet, AccountBalance, TrendingUp, EmojiEvents, // Changed Landmark->AccountBalance
  Bookmark, BugReport, Business, Storage, AttachMoney, Flag, GridView, PlaylistAddCheck, FactCheck, NoteAdd,
  EditNote, FolderZip, Mail, Chat, Phone, Archive, Shield, Tune, Star, Label,
  CheckCircle, Info, Help, Delete, Edit, AddBox, Search, FilterList,
  Home, Menu, Forum, NetworkWifi, Slideshow, ViewKanban, FormatListBulleted, Timeline, ManageAccounts,
  BackupTable, Calculate, CameraAlt, DriveEta, Contacts, CreditCard, EmojiPeople, CurrencyBitcoin, Album,
  FileDownload, Interests, FitnessCenter, Code, Coffee, Explore, ContentCopy, Copyright,
  DeveloperBoard, MyLocation, Close, Circle // Circle is kept as a default
} from '@mui/icons-material';
import { SvgIconProps } from '@mui/material/SvgIcon'; 

export const allIconsArray: IconData[] = [
    { id: 1, icon: <Dashboard className="text-[23px]"/>, name: 'Dashboard', isSelected: true },
    { id: 2, icon: <Adjust className="text-[23px]"/>, name: 'Adjust', isSelected: false },
    { id: 3, icon: <BarChart className="text-[23px]"/>, name: 'BarChart', isSelected: false },
    { id: 4, icon: <BusinessCenter className="text-[23px]"/>, name: 'BusinessCenter', isSelected: false },
    { id: 5, icon: <People className="text-[23px]"/>, name: 'People', isSelected: false },
    { id: 6, icon: <PersonAdd className="text-[23px]"/>, name: 'PersonAdd', isSelected: false },
    { id: 7, icon: <Article className="text-[23px]"/>, name: 'Article', isSelected: false },
    { id: 8, icon: <Assignment className="text-[23px]"/>, name: 'Assignment', isSelected: false },
    { id: 9, icon: <CheckBox className="text-[23px]"/>, name: 'CheckBox', isSelected: false },
    { id: 10, icon: <Event className="text-[23px]"/>, name: 'Event', isSelected: false },
    { id: 11, icon: <AccessTime className="text-[23px]"/>, name: 'AccessTime', isSelected: false },
    { id: 12, icon: <DataUsage className="text-[23px]"/>, name: 'DataUsage', isSelected: false },
    { id: 13, icon: <PieChart className="text-[23px]"/>, name: 'PieChart', isSelected: false },
    { id: 14, icon: <Settings className="text-[23px]"/>, name: 'Settings', isSelected: false },
    { id: 15, icon: <Folder className="text-[23px]"/>, name: 'Folder', isSelected: false },
    { id: 16, icon: <FolderShared className="text-[23px]"/>, name: 'FolderShared', isSelected: false },
    { id: 17, icon: <AccountBalanceWallet className="text-[23px]"/>, name: 'AccountBalanceWallet', isSelected: false },
    { id: 18, icon: <AccountBalance className="text-[23px]"/>, name: 'AccountBalance', isSelected: false },
    { id: 19, icon: <TrendingUp className="text-[23px]"/>, name: 'TrendingUp', isSelected: false },
    { id: 20, icon: <EmojiEvents className="text-[23px]"/>, name: 'EmojiEvents', isSelected: false },
    { id: 21, icon: <Bookmark className="text-[23px]"/>, name: 'Bookmark', isSelected: false },
    { id: 22, icon: <BugReport className="text-[23px]"/>, name: 'BugReport', isSelected: false },
    { id: 23, icon: <Business className="text-[23px]"/>, name: 'Business', isSelected: false },
    { id: 24, icon: <Storage className="text-[23px]"/>, name: 'Storage', isSelected: false },
    { id: 25, icon: <AttachMoney className="text-[23px]"/>, name: 'AttachMoney', isSelected: false },
    { id: 26, icon: <Flag className="text-[23px]"/>, name: 'Flag', isSelected: false },
    { id: 27, icon: <GridView className="text-[23px]"/>, name: 'GridView', isSelected: false },
    { id: 28, icon: <PlaylistAddCheck className="text-[23px]"/>, name: 'PlaylistAddCheck', isSelected: false },
    { id: 29, icon: <FactCheck className="text-[23px]"/>, name: 'FactCheck', isSelected: false },
    { id: 30, icon: <NoteAdd className="text-[23px]"/>, name: 'NoteAdd', isSelected: false },
    { id: 31, icon: <EditNote className="text-[23px]"/>, name: 'EditNote', isSelected: false },
    { id: 32, icon: <FolderZip className="text-[23px]"/>, name: 'FolderZip', isSelected: false },
    { id: 33, icon: <Archive className="text-[23px]"/>, name: 'Archive', isSelected: false },
    { id: 34, icon: <Mail className="text-[23px]"/>, name: 'Mail', isSelected: false },
    { id: 35, icon: <Chat className="text-[23px]"/>, name: 'Chat', isSelected: false },
    { id: 36, icon: <Phone className="text-[23px]"/>, name: 'Phone', isSelected: false },
    { id: 37, icon: <Shield className="text-[23px]"/>, name: 'Shield', isSelected: false },
    { id: 38, icon: <Tune className="text-[23px]"/>, name: 'Tune', isSelected: false },
    { id: 39, icon: <Star className="text-[23px]"/>, name: 'Star', isSelected: false },
    { id: 40, icon: <Label className="text-[23px]"/>, name: 'Label', isSelected: false },
    { id: 41, icon: <CheckCircle className="text-[23px]"/>, name: 'CheckCircle', isSelected: false },
    { id: 42, icon: <Info className="text-[23px]"/>, name: 'Info', isSelected: false },
    { id: 43, icon: <Help className="text-[23px]"/>, name: 'Help', isSelected: false },
    { id: 44, icon: <Delete className="text-[23px]"/>, name: 'Delete', isSelected: false },
    { id: 45, icon: <Edit className="text-[23px]"/>, name: 'Edit', isSelected: false },
    { id: 46, icon: <AddBox className="text-[23px]"/>, name: 'AddBox', isSelected: false },
    { id: 47, icon: <Search className="text-[23px]"/>, name: 'Search', isSelected: false },
    { id: 48, icon: <FilterList className="text-[23px]"/>, name: 'FilterList', isSelected: false },
    { id: 49, icon: <Home className="text-[23px]"/>, name: 'Home', isSelected: false },
    { id: 50, icon: <Menu className="text-[23px]"/>, name: 'Menu', isSelected: false },
    { id: 51, icon: <Forum className="text-[23px]"/>, name: 'Forum', isSelected: false },
    { id: 52, icon: <NetworkWifi className="text-[23px]"/>, name: 'NetworkWifi', isSelected: false },
    { id: 53, icon: <Slideshow className="text-[23px]"/>, name: 'Slideshow', isSelected: false },
    { id: 54, icon: <ViewKanban className="text-[23px]"/>, name: 'ViewKanban', isSelected: false },
    { id: 55, icon: <FormatListBulleted className="text-[23px]"/>, name: 'FormatListBulleted', isSelected: false },
    { id: 56, icon: <Timeline className="text-[23px]"/>, name: 'Timeline', isSelected: false },
    { id: 57, icon: <ManageAccounts className="text-[23px]"/>, name: 'ManageAccounts', isSelected: false },
    { id: 58, icon: <BackupTable className="text-[23px]"/>, name: 'BackupTable', isSelected: false },
    { id: 59, icon: <Calculate className="text-[23px]"/>, name: 'Calculate', isSelected: false },
    { id: 60, icon: <CameraAlt className="text-[23px]"/>, name: 'CameraAlt', isSelected: false },
    { id: 61, icon: <DriveEta className="text-[23px]"/>, name: 'DriveEta', isSelected: false },
    { id: 62, icon: <Contacts className="text-[23px]"/>, name: 'Contacts', isSelected: false },
    { id: 63, icon: <CreditCard className="text-[23px]"/>, name: 'CreditCard', isSelected: false },
    { id: 64, icon: <EmojiPeople className="text-[23px]"/>, name: 'EmojiPeople', isSelected: false },
    { id: 65, icon: <CurrencyBitcoin className="text-[23px]"/>, name: 'CurrencyBitcoin', isSelected: false },
    { id: 66, icon: <Album className="text-[23px]"/>, name: 'Album', isSelected: false },
    { id: 67, icon: <FileDownload className="text-[23px]"/>, name: 'FileDownload', isSelected: false },
    { id: 68, icon: <Interests className="text-[23px]"/>, name: 'Interests', isSelected: false },
    { id: 69, icon: <FitnessCenter className="text-[23px]"/>, name: 'FitnessCenter', isSelected: false },
    { id: 70, icon: <Code className="text-[23px]"/>, name: 'Code', isSelected: false },
    { id: 71, icon: <Coffee className="text-[23px]"/>, name: 'Coffee', isSelected: false },
    { id: 72, icon: <Explore className="text-[23px]"/>, name: 'Explore', isSelected: false },
    { id: 73, icon: <ContentCopy className="text-[23px]"/>, name: 'ContentCopy', isSelected: false },
    { id: 74, icon: <Copyright className="text-[23px]"/>, name: 'Copyright', isSelected: false },
    { id: 75, icon: <DeveloperBoard className="text-[23px]"/>, name: 'DeveloperBoard', isSelected: false },
    { id: 76, icon: <MyLocation className="text-[23px]"/>, name: 'MyLocation', isSelected: false },
    { id: 77, icon: <Close className="text-[23px]"/>, name: 'Close', isSelected: false },
];
function allIcons() {
    const {
        allIconsDataObject:{allIconsData,setAllIconsData},
        selectedIconObject:{selectedIcon, setSelectedIcon},
        openIconWindowObject:{setOpenIconWindow},
    }=useContextApp();
    // access selectedTask setter to update the task preview when choosing an icon while editing
    const _ctx = useContextApp() as any;
    const selectedTask: any = _ctx?.selectedTaskObject?.selectedTask ?? null;
    const setSelectedTask: ((t: any) => void) | undefined = _ctx?.selectedTaskObject?.setSelectedTask;
    function handleTheIconsSelection(singleIcon:IconData){
        setAllIconsData((prevIcons: IconData[])=>
            prevIcons.map((icon: IconData)=>{
                if(icon.name===singleIcon.name){
                    setSelectedIcon(singleIcon);
                    // if user is editing a task, update selectedTask so the preview reflects the new icon immediately
                    if (setSelectedTask && selectedTask) {
                        setSelectedTask({ ...selectedTask, icon: singleIcon.name });
                    }
                    return{...icon,isSelected:true};
                }
                return{...icon,isSelected:false};
            })
        );
        setOpenIconWindow(false);
    }
    return(
        <div className="flex flex-wrap gap-2 text-orange-600 p-3">
            { allIconsData.map((singleIcon: IconData, index: number)=>(
                <div
                key={index}
                onClick={()=>handleTheIconsSelection(singleIcon)}
                className={`w-9 h-9 shadow-sm border border-slate-50 flex items-center justify-center rounded-lg hover:bg-orange-600 hover:text-white ${singleIcon.isSelected ? "bg-orange-600 text-white" : "bg-white text-orange-600"}`}
                >
                {singleIcon.icon}
                </div>
            ))}
        </div>
    );
}
export default allIcons;