

export class User {
    id: any
    user : UserInfo;
    token: string;
    permisos: any[];
    imagenPerfil?: string | null;
    newImage: any;
    validPassword: any;
}

export class rol {
    id: string;
    nombre: string;
    estatus: number;
}

export class UserInfo {
    id: any;
    validPassword: any
    rol: rol;
    userName: string;
    emailConfirmed: string;
    password: string;
    telefono: any;
    cadena?: any;
    estatus?: boolean;
    nombre: string;
    username: any;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
    nombreCompleto?: string;
    permisos: any[];
    email:string;
    cliente: any;
    sucursal?: any;
    idCliente?:number;
    idSucursal:number;
    idCadena?:number;
    imagenPerfil: string;
    idCaja: number;
    idRol: any;
    caja: any;
}