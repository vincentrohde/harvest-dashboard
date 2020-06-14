// service for common 'semantic-ui-react' tasks
class SemanticUiService {
    // conversion for Select options format
    convertDataToSelectOptions (data) {
        return data.map(item => {
            return {
                value: item.id,
                text: item.name,
                key: item.id
            }
        })
    }
}

export const semanticUiService = new SemanticUiService();