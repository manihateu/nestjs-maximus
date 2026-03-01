"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseExplorerService = void 0;
function flatten(arr) {
    return arr.reduce((acc, a) => acc.concat(a), []);
}
class BaseExplorerService {
    getModules(modulesContainer, include) {
        const modules = Array.from(modulesContainer.values());
        if (!include?.length)
            return modules;
        return modules.filter((m) => include.includes(m.metatype));
    }
    flatMap(modules, callback) {
        const visited = new Set();
        const unwrap = (moduleRef) => {
            if (visited.has(moduleRef))
                return [];
            visited.add(moduleRef);
            const providers = Array.from(moduleRef.providers?.values() || []);
            const defined = providers
                .map((wrapper) => (wrapper.instance !== undefined ? callback(wrapper, moduleRef) : undefined))
                .filter(Boolean);
            const imports = moduleRef.imports ? Array.from(moduleRef.imports.values()) : [];
            const imported = flatten(imports.map((imp) => unwrap(imp)));
            return [...defined, ...imported];
        };
        return flatten(modules.map(unwrap)).filter(Boolean);
    }
}
exports.BaseExplorerService = BaseExplorerService;
