type BuildRangeTuple<Current extends [...number[]], Count extends number> =
    Current["length"] extends Count
    ? Current
    : BuildRangeTuple<[number, ...Current], Count>;

type RangeTuple<Count extends number> = BuildRangeTuple<[], Count>;

type BuildRange<Current extends number, End extends number, Accu extends [...number[]]> =
    Accu["length"] extends End
    ? Current
    : BuildRange<Current | Accu["length"], End, [number, ...Accu]>;

export type Serie<StartInclusive extends number, EndExclusive extends number> = BuildRange<StartInclusive, EndExclusive, RangeTuple<StartInclusive>>;
