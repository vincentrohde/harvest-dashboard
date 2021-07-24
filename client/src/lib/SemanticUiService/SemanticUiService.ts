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
    convertDataToSelectOptions(data: ApiData[]): SelectOption[] {
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
