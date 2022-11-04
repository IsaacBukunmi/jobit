import { AddBoxOutlined, GraphicEqOutlined, ListOutlined, PermIdentity } from '@material-ui/icons'
import { WorkHistoryOutlined } from '@mui/icons-material'
import { routes } from '../utils/routes'

export const navItems = [
    {
        id:1,
        title: "Stats",
        icon: <GraphicEqOutlined />,
        link: routes.DASHBOARD
    },
    {
        id:2,
        title: "All Jobs",
        icon: <WorkHistoryOutlined />,
        link: routes.ALL_JOBS
    },
    {
        id:3,
        title: "Add Job",
        icon: <AddBoxOutlined />,
        link: routes.ADD_JOB
    },
    {
        id:4,
        title: "Profile",
        icon: <PermIdentity />,
        link: routes.PROFILE
    },
    {
        id:5,
        title: "Job Listings",
        icon: <ListOutlined />,
        link: routes.LISTINGS
    }
]