"use client";

import * as React from "react";
import { FileText, Home, UploadCloud } from "lucide-react";

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
import { useSession } from "next-auth/react";




const data = {
	navMain: [
		{
			title: "Home",
			url: "/dashboard",
			icon: Home,
			isActive: true,
		},
		{
			title: "Upload Agreement",
			url: "/dashboard/upload-agreement",
			icon: UploadCloud,
		},
		{
			title: "All Agreements",
			url: "/dashboard/agreements",
			icon: FileText,
		},
	],
};

export function DashboardSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const {data: session} = useSession();
	const user = session?.user;
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarContent>
				<SidebarGroup className="pt-2 mb-4 text-xl md:text-2xl text-foreground font-semibold">
					<SidebarMenu>
						<SidebarMenuItem className="mb-2 pointer-events-none">
							<SidebarMenuButton tooltip={"AgreeWise"}>
								<Image
									src="/favicon.webp"
									alt="AgreeWise"
									width={100}
									height={100}
									className="size-8 md:size-10"
								/>
								<span className="text-xl md:text-2xl">AgreeWise</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={{ name: user?.name || "", email: user?.email || "", avatar: user?.avatar || ""}} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
