
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePresence } from "@/hooks/usePresence";
import { useNavigate } from "react-router-dom";

interface ChatHeaderProps {
  otherUserId: string;
  otherUserName: string;
  otherUserAvatar?: string;
  onBack?: () => void;
}

export const ChatHeader = ({
  otherUserId,
  otherUserName,
  otherUserAvatar,
  onBack
}: ChatHeaderProps) => {
  const navigate = useNavigate();
  const { isUserOnline } = usePresence();

  const handleVisitProfile = () => {
    navigate(`/profile/${otherUserId}`);
  };

  return (
    <div className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
      <div className="flex items-center gap-3">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack} className="md:hidden">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={otherUserAvatar} />
                  <AvatarFallback>
                    {otherUserName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {isUserOnline(otherUserId) && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900">{otherUserName}</h3>
                <p className="text-sm text-gray-500">
                  {isUserOnline(otherUserId) ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={handleVisitProfile}>
              Visit Profile
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleVisitProfile}>
            Visit Profile
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
