
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, BarChart3, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardsDropdownProps {
  user: any;
}

const DashboardsDropdown = ({ user }: DashboardsDropdownProps) => {
  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-1 text-sm">
          <BarChart3 className="w-4 h-4" />
          <span>Tableaux de bord</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-48">
        <DropdownMenuItem asChild>
          <Link to="/bookings" className="flex items-center space-x-2 w-full">
            <Calendar className="w-4 h-4" />
            <span>Mes Réservations</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/provider-dashboard" className="flex items-center space-x-2 w-full">
            <BarChart3 className="w-4 h-4" />
            <span>Tableau Prestataire</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardsDropdown;
