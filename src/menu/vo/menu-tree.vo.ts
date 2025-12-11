import { Expose } from "class-transformer";

export class MenuTreeVo {
  id: string;

  name: string;

  componentPath: string;

  href: string;

  parentId: string;

  children: MenuTreeVo[];
}
