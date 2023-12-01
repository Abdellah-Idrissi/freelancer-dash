
type themeType = 'dark' | 'light'

type linkType = {
  href:string
  title:string
}

type asideSliceType = boolean

type hrefTypes = '' |'kanban' | 'calendar' | 'clients' | 'projects'

type dndType = 'item' | 'container'

type IdType = number | string


type ItemDataType = {
  id:IdType
  content:string
  parentId:IdType
}

type ItemType = {
  id:IdType
  content:string
}

type ContainerType = {
  id:number
  title:string
  items:ItemType[]
}

type ContainersType = ContainerType[]

type ContainerStateType =  {
  id:number
  title:string
  itemsCount:number
}

type calendarEventType = {
  title: string
  id: string
  start: string
  end: string
  allDay:boolean
}

type calendarType = calendarEventType[]

type serverActionReturnType = {
  error:boolean
  message?:string
}

type referralSourceTypes =
  | "LinkedIn"
  | "Ads"
  | "Github"
  | "Freelance Platform"
  | "Personal Network"
  | "Others";

type clientType = {
  id: string;
  name: string;
  email: string;
  country: string;
  projects: number;
  referralSource: referralSourceTypes;
};

type projectTypeTypes = 'FrontEnd' | 'BackEnd' | 'FullStack' | 'UI/UX'

type projectType = {
  id:IdType
  title:string
  description:string
  type:projectTypeTypes
  startDate:Date
  endDate:Date
}

type projectsType = projectType[]


type barChartType = {
  name:string
  'Project type count':number
}[]

type donutChartType = {
  name:string
  number:number
}[]