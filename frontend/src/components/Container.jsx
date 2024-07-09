import { useState } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const Container = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex">
      <Sidebar onTabChange={handleTabChange} />
      <MainContent activeTab={activeTab} />
    </div>
  );
};

export default Container;
