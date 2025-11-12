import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Menú',
  },
  // {
  //   displayName: 'Tablero',
  //   iconName: 'home',
  //   route: '/dashboard',
  // },
  {
    displayName: 'Administración',
    iconName: 'box-multiple',
    route: '/menu-level',
    children: [
      {
        displayName: 'Módulos',
        // iconName: 'puzzle',
        route: '/modulos',
      },
      {
        displayName: 'Permisos',
        // iconName: 'shield-lock',
        route: '/permisos',
      },
      {
        displayName: 'Productos',
        route: '/productos',
      },
      {
        displayName: 'Marcas',
        route: '/marcas',
      },
      {
        displayName: 'Modelos',
        route: '/modelos',
      },
      {
        displayName: 'Equipos',
        route: '/equipos',
      },
      // {
      //   displayName: 'Bitácora',
      //   iconName: 'date',
      // },
    ],
  },
  {
    displayName: 'Clientes',
    iconName: 'address-book',
    route: '/menu-level',
    children: [
      {
        displayName: 'Agregar Cliente',
        // iconName: 'user-cog',
        // route: '/roles',
      },
      {
        displayName: 'Lista Clientes',
        // iconName: 'user-cog',
        route: '/clientes',
      },
    ],
  },
  {
    displayName: 'Usuarios',
    iconName: 'users',
    route: '/menu-level',
    children: [
      {
        displayName: 'Agregar Usuario',
        // iconName: 'user-cog',
        // route: '/roles',
      },
      {
        displayName: 'Lista Usuarios',
        // iconName: 'user-cog',
        route: '/usuarios',
      },
    ],
  },
  {
    displayName: 'Roles',
    iconName: 'user-cog',
    route: '/menu-level',
    children: [
      {
        displayName: 'Agregar Rol',
        // iconName: 'user-cog',
        // route: '/roles',
      },
      {
        displayName: 'Lista Roles',
        // iconName: 'user-cog',
        route: '/roles',
      },
    ],
  },
  {
    navCap: 'Operación',
  },
  {
    displayName: 'Monitoreo',
    iconName: 'chart-line',
    route: '/monitoreo',
  },
  {
    displayName: 'Ins. Central',
    iconName: 'antenna',
    route: '/instalaciones-centrales',
  },
  {
    displayName: 'Instalaciones',
    iconName: 'building-warehouse',
    route: '/instalaciones',
  },
  // {
  //   displayName: 'Incidencias',
  //   iconName: 'alert-triangle',
  // },
  // {
  //   displayName: 'Dashboard',
  //   iconName: 'home',
  //   route: '/dashboard',
  // },

  {
    navCap: 'Ajustes',
  },
  {
    displayName: 'Perfil Usuario',
    iconName: 'user',
    // route: '/permisos',
  },
  {
    displayName: 'Cerrar Sesión',
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
