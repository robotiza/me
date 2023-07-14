const nextTick = () => new Promise<void>(resolve => process?.nextTick ? process?.nextTick(resolve) : setImmediate(resolve));

export default nextTick;