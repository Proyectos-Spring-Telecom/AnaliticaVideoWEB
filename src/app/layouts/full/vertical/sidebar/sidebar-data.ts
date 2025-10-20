import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Administración',
  },
  {
    displayName: 'Dashboard',
    iconName: 'home',
    route: '/dashboard',
  },
  {
    displayName: 'Permisos',
    iconName: 'shield-lock',
    route: '/permisos',
  },
  {
    displayName: 'Módulos',
    iconName: 'puzzle',
    route: '/modulos',
  },
  {
    displayName: 'Roles',
    iconName: 'user-cog',
    route: '/roles',
  },
  {
    displayName: 'Usuarios',
    iconName: 'users',
    route: '/usuarios',
  },
  {
    displayName: 'Clientes',
    iconName: 'address-book',
    route: '/clientes',
  },
  {
    navCap: 'Gestión',
  },
  {
  displayName: 'Productos',
  iconName: 'packages',   // cajas/productos
  route: '/productos',
},
{
  displayName: 'Marcas',
  iconName: 'trademark',  // marca registrada
  route: '/marcas',
},
{
  displayName: 'Modelos',
  iconName: 'cube',       // modelo/pieza
  route: '/modelos',
},
{
  displayName: 'Equipos',
  iconName: 'tools',      // herramientas/equipo
  route: '/equipos',
},

  {
    navCap: 'Sesión',
  },
  {
    displayName: 'Perfil Usuario',
    iconName: 'user',
    route: '/permisos',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/login',
  },
  // {
  //   displayName: 'Register',
  //   iconName: 'user-edit',
  //   route: '/authentication/register',
  // },
  // {
  //   navCap: 'Other',
  // },
  // {
  //   displayName: 'Menu Level',
  //   iconName: 'box-multiple',
  //   route: '/menu-level',
  //   children: [
  //     {
  //       displayName: 'Menu 1',
  //       iconName: 'point',
  //       route: '/menu-1',
  //       children: [
  //         {
  //           displayName: 'Menu 1',
  //           iconName: 'point',
  //           route: '/menu-1',
  //         },

  //         {
  //           displayName: 'Menu 2',
  //           iconName: 'point',
  //           route: '/menu-2',
  //         },
  //       ],
  //     },

  //     {
  //       displayName: 'Menu 2',
  //       iconName: 'point',
  //       route: '/menu-2',
  //     },
  //   ],
  // },
  // {
  //   displayName: 'Disabled',
  //   iconName: 'ban',
  //   route: '/disabled',
  //   disabled: true,
  // },
  // {
  //   displayName: 'Chip',
  //   iconName: 'mood-smile',
  //   route: '/',
  //   chip: true,
  //   chipClass: 'bg-secondary text-white',
  //   chipContent: '9',
  // },
  // {
  //   displayName: 'Outlined',
  //   iconName: 'mood-smile',
  //   route: '/',
  //   chip: true,
  //   chipClass: 'b-1 border-secondary text-secondary',
  //   chipContent: 'outlined',
  // },
  // {
  //   displayName: 'External Link',
  //   iconName: 'star',
  //   route: 'https://www.google.com/',
  //   external: true,
  // },
];
