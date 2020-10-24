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

class SemanticUiService {
    // conversion for Select options format
    convertDataToSelectOptions (data: ApiData[]): SelectOption[] {
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