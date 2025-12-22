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
import TableContent from "@/app/(demoapp)/home/TableContent";

const HomePage: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex w-full max-w flex-col gap-6">
                <Tabs defaultValue="account">
                    <TabsList>
                        <TabsTrigger value="account">Table</TabsTrigger>
                        <TabsTrigger value="kanban">Kanban</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <Card className='flex-grow'>
                            <CardHeader>
                                <CardTitle>Account</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                            {/*    Table content*/}
                                <TableContent />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="kanban">
                        <Card>
                            <CardHeader>
                                <CardTitle>Password</CardTitle>
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

export default HomePage;
