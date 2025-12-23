"use client";

import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

const ProfilePage: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex w-full max-w flex-col gap-6">
                <Tabs defaultValue="account">
                    <TabsList>
                        <TabsTrigger value="profile" className='cursor-pointer'>Profile</TabsTrigger>
                        <TabsTrigger value="change-password" className='cursor-pointer'>Change password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile">
                        <Card className='flex-grow'>
                            <CardHeader>
                                <CardTitle>Profile</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                {/*Profile content*/}
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="change-password">
                        <Card>
                            <CardHeader>
                                <CardTitle>Change password</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div className="grid gap-3">
                                    Kanban content
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default ProfilePage;
