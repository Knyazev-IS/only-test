declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

declare const PLATFORM: 'mobile' | 'desktop';
declare const ENV: 'production' | 'development';
