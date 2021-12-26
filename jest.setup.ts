import 'reflect-metadata';
import { container } from 'tsyringe';

container.register('username', { useValue: 'user' });
container.register('password', { useValue: 'pass' });
container.register('baseUrl', { useValue: 'base' });
