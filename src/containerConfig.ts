import 'reflect-metadata';
import { container } from 'tsyringe';

container.register('baseUrl', { useValue: import.meta.env.VITE_DEV_DB });

export default container;
