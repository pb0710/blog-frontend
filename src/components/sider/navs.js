import HomeIcon from 'mdi-react/HomeIcon'
import LibraryEditIcon from 'mdi-react/LibraryEditIcon'
import CreateIcon from 'mdi-react/CreateIcon'
import SettingsIcon from 'mdi-react/SettingsIcon'
import InfoCircleIcon from 'mdi-react/InfoCircleIcon'
import i18n from '@/common/i18n'

const getNavs = (t = i18n.t) => [
	{
		id: '0',
		level: 1,
		to: '',
		title: t('nav.home'),
		icon: <HomeIcon size={20} />
	},
	{
		id: '1',
		level: 1,
		to: '/article',
		title: t('nav.article_category'),
		icon: <LibraryEditIcon size={20} />,
		child: [
			{
				id: '10',
				level: 2,
				to: '/frontend',
				title: t('nav.frontend')
			},
			{
				id: '11',
				level: 2,
				to: '/mobile',
				title: t('nav.mobile')
			},
			{
				id: '12',
				level: 2,
				to: '/backend',
				title: t('nav.backend')
			},
			{
				id: '13',
				level: 2,
				to: '/computer_science',
				title: t('nav.computer_science')
			},
			{
				id: '14',
				level: 2,
				to: '/engineering',
				title: t('nav.engineering')
			}
		]
	},
	{
		id: '2',
		level: 1,
		to: '/upload',
		title: t('nav.write'),
		icon: <CreateIcon size={20} />
	},
	{
		id: '3',
		level: 1,
		to: '/setting',
		title: t('nav.settings'),
		icon: <SettingsIcon size={20} />
	},
	{
		id: '4',
		level: 1,
		to: '/about',
		title: t('nav.about'),
		icon: <InfoCircleIcon size={20} />
	}
]

export default getNavs
