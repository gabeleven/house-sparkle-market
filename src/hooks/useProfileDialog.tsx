
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useProfileDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string>('');
  const navigate = useNavigate();

  const openProfileDialog = (userId: string, userName: string) => {
    setSelectedUserId(userId);
    setSelectedUserName(userName);
    setIsDialogOpen(true);
  };

  const closeProfileDialog = () => {
    setIsDialogOpen(false);
    setSelectedUserId(null);
    setSelectedUserName('');
  };

  const confirmViewProfile = () => {
    if (selectedUserId) {
      navigate(`/profile/${selectedUserId}`);
    }
    closeProfileDialog();
  };

  return {
    isDialogOpen,
    selectedUserName,
    openProfileDialog,
    closeProfileDialog,
    confirmViewProfile
  };
};
