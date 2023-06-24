import { MongoClient, ObjectId } from "mongodb";
import { EventObject, MachineConfig, StateMachine, createMachine, interpret } from "xstate";

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('documents');

    // the following code examples can be pasted here...

    return 'done.';
}

export const db = client.db('xstate');

export const machines = db.collection('machines');

export const instances = db.collection('instances');

export type Machine = StateMachine<unknown, any, EventObject>;

export type Config = MachineConfig<unknown, any, EventObject>;

export type State = {};

export type Options = {};

export interface Instance<S extends string = string, C extends {} = {}> {
    id: string;
    machine: string;
    state: S;
    context: C;
}

export const loadConfig = (machineKey: string): Promise<Config> => new Promise<Config>(
    async (resolve, reject) => {
        const document = await machines.findOne({ _id: new ObjectId(machineKey) });

        if (!document || document._id.toString() !== machineKey) {
            reject();
        } else {

            const { _id, ...config } = document;

            resolve(config);
        }
    }
);

export const loadMachine = (machineKey: string, options?: Options): Promise<Machine> => loadConfig(machineKey).then(
    config => createMachine(config, options)
);

export const loaInstance = <S extends string = string, C extends {} = {}>(id: string): Promise<Instance<S, C>> => new Promise<Instance<S, C>>(
    async (resolve, reject) => {
        const document = await instances.findOne({ _id: new ObjectId(id) });

        if (!document || document._id.toString() !== id) {
            reject();
        } else {
            const { _id, ...state } = document;

            resolve(state as Instance<S, C>);
        }
    }
);

export const saveInstance = <T extends {} = {}>(stateKey: string, state: T): Promise<T> => new Promise<T>(
    async (resolve, reject) => {
        const result = await instances.replaceOne({ _id: new ObjectId(stateKey) }, state, { upsert: true });

        resolve(state as T);
    }
);

export const restoreInstance = <S extends string = string, C extends {} = {}>(id: string, options?: Options): Promise<Machine> => new Promise<Machine>(
    (resolve, reject) => {
        loaInstance(id).then(
            ({ machine, state, context }) => {
                loadConfig(machine).then(
                    config => {
                        const machine = createMachine({ ...config, initial: state }, options);
                        resolve(machine.withContext(context));
                    }
                ).catch(reject);
            }
        ).catch(reject);
    }
);

export const suspendInstance = <S extends string = string>({ context }: Machine, machineKey: string, state: S, id?: string): Promise<string> => new Promise<string>(
    (resolve, reject) => {
        const instance = {
            _id: id ? new ObjectId(id) : new ObjectId(),
            machine: machineKey,
            state,
            context
        };

        instances.insertOne(instance).then(
            ({ insertedId }) => resolve(insertedId.toString())
        ).catch(reject);
    }
);