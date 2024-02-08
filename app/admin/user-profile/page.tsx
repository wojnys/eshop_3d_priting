"use client";

import {SignedOut, SignOutButton, UserProfile} from "@clerk/nextjs";
import {FaCarSide, FaFirstOrder} from "@node_modules/react-icons/fa";

const UserProfilePage = () => (
    <UserProfile path="/admin/user-profile" routing="path">
        {/*<UserProfile.Page label="Custom Page" labelIcon={<FaCarSide />} url="/admin/view-order">*/}
        {/*</UserProfile.Page>*/}
        <UserProfile.Link label="Objednávky" labelIcon={<FaFirstOrder />} url="/admin/orders"/>
        <UserProfile.Link label="Výpis objednávek" labelIcon={<FaFirstOrder />} url="/admin/view-order"/>
    </UserProfile>
);


export default UserProfilePage;