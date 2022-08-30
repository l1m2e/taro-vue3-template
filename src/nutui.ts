import { App } from 'vue'
import {
  Button,
  Icon,
  Dialog,
  Cell,
  Steps,
  Step,
  CellGroup,
  Toast,
  OverLay,
  Popup,
  Image,
  Notify,
  Avatar
} from '@nutui/nutui-taro'

const setNutUi = (app: App) => {
  app
    .use(Button)
    .use(Icon)
    .use(Dialog)
    .use(Cell)
    .use(Steps)
    .use(Step)
    .use(CellGroup)
    .use(Toast)
    .use(OverLay)
    .use(Popup)
    .use(Image)
    .use(Notify)
    .use(Avatar)
}

export default setNutUi
