"use client";

import * as React from "react";
import {
	BookOpen,
	Bot,
	SquareTerminal,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { NavUser } from "./NavUser";
import { NavMain } from "./NavMain";

// This is sample data.
const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navMain: [
		{
			title: "Home",
			url: "/dashboard",
			icon: SquareTerminal,
			isActive: true,
			
		},
		{
			title: "Upload Agreement",
			url: "/dashboard/upload-agreement",
			icon: Bot,

		},
		{
			title: "Agreements",
			url: "/dashboard/agreements",
			icon: BookOpen,
		
		},
	],
};

export function DashboardSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarContent>
				<SidebarGroup className="pt-2 mb-4 text-xl md:text-2xl text-foreground font-semibold">
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton tooltip={"AgreeWise"}>
								<Image
									src="/favicon.webp"
									alt="AgreeWise"
									width={50}
									height={50}
                  className="size-8 md:size-10"
								/>
								<span>AgreeWise</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
