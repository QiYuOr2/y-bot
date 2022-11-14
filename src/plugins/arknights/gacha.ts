import { fillArray, Pool } from "../../utils";

interface Counter {
  lastSSR: number
}

interface ArknightsGachaResult {
  ssr: Record<string, number>
  sr: Record<string, number>
  r: Record<string, number>
  n: Record<string, number>
}

const initCounter = {
  /**
   * 距离上次SSR
   */
  lastSSR: 0,
};

const SSROption = {
  BaseChance: 0.02,
  UpChance: 0.02,
  TurningPoint: 50
};

const SROption = {
  BaseChance: 0.08
};

const ROption = {
  BaseChance: 0.5
};

export class ArknightsGacha {
  #pool: GachaConfig<string[]>;
  #counter!: Counter;
  #result: ArknightsGachaResult = {
    ssr: {},
    sr: {},
    r: {},
    n: {}
  };

  constructor(pool: GachaConfig<string[]>) {
    this.#pool = pool;
    this.#clearCounter();
  }

  #increaseCounter() {
    this.#counter.lastSSR += 1;
  }
  #clearCounter() {
    this.#counter = initCounter;
  }

  #isSSR() {
    let chance = 0;
    if (this.#counter.lastSSR <= SSROption.TurningPoint) {
      chance = SSROption.BaseChance;
    } else {
      chance = SSROption.BaseChance + (this.#counter.lastSSR * SSROption.UpChance);
    }

    return chance >= Math.random();
  }

  #isSR() {
    return SROption.BaseChance >= Math.random();
  }

  #isR() {
    return ROption.BaseChance >= Math.random();
  }

  #fillPoolWithNormalUp(source: string[], up: string[]) {
    const upCount = Math.round(source.length / up.length);

    return [...source, ...up.map(item => fillArray(upCount, item)).flat()];
  }

  #fillPoolWithLimitUp(source: string[], up: GachaUp<string[]>) {
    const mainProbability = 0.7;
    const mainUpCount = Math.round((mainProbability * source.length) / (1 - mainProbability));

    const mainList = up.ssr.main.map(
      item => fillArray(Math.floor(mainUpCount / up.ssr.main.length), item)
    );
    const subList = up.ssr.sub.map(
      item => fillArray(5, item)
    );
    
    return [...source, ...mainList, ...subList].flat();
  }

  single() {
    if (this.#isSSR()) {
      const ssr = Pool(this.#fillPoolWithLimitUp(this.#pool.all.ssr, this.#pool.up))
        .one();
      this.#clearCounter();

      if (this.#result.ssr[ssr]) {
        this.#result.ssr[ssr] += 1;
      } else {
        this.#result.ssr[ssr] = 1;
      }

      return this.#result;
    } 
    this.#increaseCounter();
    if (this.#isSR()) {
      const sr = Pool(this.#fillPoolWithNormalUp(this.#pool.all.sr, this.#pool.up.sr))
        .one();

      if (this.#result.sr[sr]) {
        this.#result.sr[sr] += 1;
      } else {
        this.#result.sr[sr] = 1;
      }

      return this.#result;
    }
    if (this.#isR()) {
      const r = Pool(this.#pool.all.r)
        .one();

      if (this.#result.r[r]) {
        this.#result.r[r] += 1;
      } else {
        this.#result.r[r] = 1;
      }

      return this.#result;
    }
    
    const n = Pool(this.#pool.all.n)
      .one();

    if (this.#result.n[n]) {
      this.#result.n[n] += 1;
    } else {
      this.#result.n[n] = 1;
    }

    return this.#result;
  }

  multi(count: number) {
    for (let i = 0; i < count; i++) {
      this.single();
    }
    return this.#result;
  }
}