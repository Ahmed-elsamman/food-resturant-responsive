import { UserType } from "../enums/user-type.enum";

export interface SideBar {
    title_en: string;
    title_ar: string;
    url: string;
    icon: string;
    role: UserType[];
}