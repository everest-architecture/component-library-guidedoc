import { typography } from '../typography/typographyVariable';
import {
  backgroundColor,
  basicColor,
  borderColor,
  extraColor,
  statusColor,
  textColor,
  themeColor,
} from './color';

//这里需要导入全部变量
//不仅仅是颜色
export const defaultTheme = {
  ...basicColor,
  ...themeColor,
  ...statusColor,
  ...backgroundColor,
  ...textColor,
  ...borderColor,
  ...extraColor,
  ...typography,
};
