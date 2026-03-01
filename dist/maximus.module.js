"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MaximusModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaximusModule = void 0;
const common_1 = require("@nestjs/common");
const max_bot_api_1 = require("@maxhub/max-bot-api");
const constants_1 = require("./constants");
const metadata_accessor_service_1 = require("./services/metadata-accessor.service");
const params_factory_1 = require("./factories/params.factory");
const listeners_explorer_service_1 = require("./listeners-explorer.service");
let MaximusModule = MaximusModule_1 = class MaximusModule {
    static forRoot(options) {
        return {
            module: MaximusModule_1,
            global: false,
            providers: [
                { provide: constants_1.MAXIMUS_MODULE_OPTIONS, useValue: options },
                {
                    provide: constants_1.MAXIMUS_BOT_NAME,
                    useFactory: (opts) => new max_bot_api_1.Bot(opts.token),
                    inject: [constants_1.MAXIMUS_MODULE_OPTIONS],
                },
                metadata_accessor_service_1.MetadataAccessorService,
                params_factory_1.MaximusParamsFactory,
                listeners_explorer_service_1.ListenersExplorerService,
            ],
            exports: [constants_1.MAXIMUS_BOT_NAME],
        };
    }
    static forRootAsync(options) {
        return {
            module: MaximusModule_1,
            global: false,
            imports: options.imports ?? [],
            providers: [
                {
                    provide: constants_1.MAXIMUS_MODULE_OPTIONS,
                    useFactory: options.useFactory,
                    inject: options.inject ?? [],
                },
                {
                    provide: constants_1.MAXIMUS_BOT_NAME,
                    useFactory: (opts) => new max_bot_api_1.Bot(opts.token),
                    inject: [constants_1.MAXIMUS_MODULE_OPTIONS],
                },
                metadata_accessor_service_1.MetadataAccessorService,
                params_factory_1.MaximusParamsFactory,
                listeners_explorer_service_1.ListenersExplorerService,
            ],
            exports: [constants_1.MAXIMUS_BOT_NAME],
        };
    }
};
exports.MaximusModule = MaximusModule;
exports.MaximusModule = MaximusModule = MaximusModule_1 = __decorate([
    (0, common_1.Module)({})
], MaximusModule);
