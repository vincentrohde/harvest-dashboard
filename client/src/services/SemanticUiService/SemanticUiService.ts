// service for common 'semantic-ui-react' tasks

interface ApiData {
    id: string;
    name: string;
}

interface SelectOption {
    value: string;
    text: string;
    key: string;
}

export type SelectOptionsList = SelectOption[];

class SemanticUiService {
    getSelectOptionsFromArray(items: string[], isFirstCharUpperCase = true): SelectOptionsList {
        return items.map((item, index) => {
            return {
                value: item,
                text: isFirstCharUpperCase ? item[0].toUpperCase() + item.slice(1) : item,
                key: index.toString()
            }
        })
    }

    convertDataToSelectOptions(data: ApiData[]): SelectOptionsList {
        return data.map((item) => {
            return {
                value: item.id,
                text: item.name,
                key: item.id
            }
        })
    }
}

export const semanticUiService = new SemanticUiService();
