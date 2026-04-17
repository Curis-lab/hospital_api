import { createContainer, asClass, InjectionMode, Lifetime } from "awilix";
import path from "path";

function camalize(str) {
  return str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace("-", "").replace("_", "")
  );
}

let container = null;

export function loadContainer() {
  if (container) {
    throw new Error("Awilix Container already loaded");
  }

  container = createContainer({
    injectionMode: InjectionMode.PROXY,
  });

  const baseDir = path.resolve(process.cwd(), 'src');

  container.loadModules(
    [
      `${baseDir}/use-cases/**/*.interactor.*`,
      `${baseDir}/adapters/**/*.presenter.*`,
      `${baseDir}/adapters/**/*.controller.*`,
      `${baseDir}/adapters/**/*.gateway.*`,
      `${baseDir}/infrastructure/plugins/**/*.*`,
      `${baseDir}/infrastructure/db/data-mappers/**/*.*`,
    ],
    {
      formatName: (name) => {
        const infraLabelsRegex =
          /impl|mysql|redis|express|sql|aws|kms|dynamo|http|sequelize|gerencianet/gi;

        let moduleName = name.replace(infraLabelsRegex, "");

        if (moduleName.startsWith("-")) {
          moduleName = moduleName.slice(1);
        }

        moduleName = moduleName.replace(".", "-");

        return camalize(moduleName).replace("-", "");
      },
      resolverOptions: {
        register: asClass,
        lifetime: Lifetime.SCOPED,
      },
      esModules:true
    }
  );

  return container;
}
