let EDITOR_TYPE = {
    TYPE_1: "presentation",
    TYPE_2: "question",
    TYPE_3: "training"
};

let ITEM_TYPE = {
    QUESTION: "question",
    PRESENTATION: "presentation"
};

let ITEM_STATE = {
    DRAFT: "draft",
    PUBLISHED: "published"
};

let ITEM_STATUS = {
    COMPLETE: 'complete',
    INCOMPLETE: 'in-complete'
}
let ITEM_SOURCE = {
    EMBEDDED: "embedded",
    LIBRARY: "quick-create"
};
let OVER_ALL_STATUS = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'

};
let PAINT_MODE = {
    EMBED: "embed",
    PUBLISHED_ITEM: 'published-item',
    SCOPE: "cosmatt_builder"
};

let ITEM_SCHEMA = {
    LATEST_SCHEMA: "2.0"
};
let ERROR_MESSAGE = {
    AUTH_ERROR: "Invalid account credentials!",
    FRONT_END_ERROR: "Oops! Something went wrong, please try again. In case the issue persists, please contact technical support.",
    EXTRACTOR_ERROR: "Unable to parse the document",
    MAX_FILE_SIZE: "Maximum file size exceeded. Please upload files below 2MB",
    EXCEL_ONLY: "Please upload a valid Excel spreadsheet document"
};

let RESOURCE_TYPE = {
    LEONARDOITEM:"leonardoItem",
    SPREADSHEET:"spreadsheet"
};

let CONFIRMATION_MESSAGE = {
    ITEM_DELETE: "Are you sure you want to delete this item?",
    DOCUMENT_DELETE: "Are you sure you want to delete this document?",
    TEMPLATE_CHANGE: "Your template specific setting will be overrided, click Proceed to continue or Cancel to maintain current preferences.",
    ITEM_CLONE: 'Are you sure you want to clone Item "#ITEM_TITLE#"?',
    DOCUMENT_REUPLOAD: "Your document specific scoring rule can be modified, click Proceed to continue or Cancel to maintain.",
    GROUP_RULES: 'Hints associated with the selected scoring rules will be deleted. Are you sure you want to continue with Group creation?',
    UNGROUP_RULES: 'Are you sure you want to ungroup?',
    UNGROUP_RULES_WITH_HINTS: 'Are you sure you want to ungroup? related hints will be deleted.',
    MAP_CONFLICT : {
        HEAD: 'Unable to upload a document with incomplete scoring rules.',
        DESC: ' Certain scoring rules are not confirmed / completely defined. Please confirm any warnings and then try to re-upload the document.'
    } 
};

let INFO_MESSAGE = {
    COPY_CLIPBOARD: "Copied to clipboard",
    UPLOAD_PROGRESS: "File operation is in progress !!",
};

let GROUP_MESSAGE = {
    GROUP_SUCCESS: "Selected rules have been grouped successfully",
    HINTS_DELETED: "Hints associated with the selected rules have been deleted",
    GROUP_HINT_PRESERVED: "Hints associated with the group have been preserved",
    CELL_HINTS_DELETED: "Hints associated with the selected cell rules have been deleted"
}

let UNGROUP_MESSAGE = {
    UNGROUP_SUCCESS: "Ungrouped successfully",
    HINTS_DELETED: "Hints associated with the group have been deleted",
    CELL_RULE_POPPED: "Rule has been removed successfully from the group"
}

let HINT_FORM_MESSAGE = {
    EMPTY_TOOLTIP_TEXT: "Tooltip text cannot be empty",
    PENALTY_SCORE_LIMIT: "Penalty score defined for a cell cannot exceed the total score",
    FILL_CELL_LAST: "If \"Fill Cells\" type hint exist, then it must be the last hint defined for a cell",
    MULTIPLE_FILL_CELL: "Only one \"Fill Cells\" hint is allowed for a cell"
}

let HTTP_STATUS = {
    SERVER_DOWN: 0
}

let HINT_TYPE = {
    FILL: {
        scheme: "fillCells",
        label: "Fill Cells",
        defaultTooltipText: "We have entered the value for you."
    },
    TEXTUAL: {
        scheme: "textual",
        label: "Show Tooltip",
        defaultTooltipText: ""
    }
}

let HINT_SCHEME = {
    QUESTION:"questionScheme",
    CELL:"cellScheme"
}
let CHANGE_SET_TYPE = {
    DELETE:"delete",
    NEW:"new",
    MODIFIED:"modified"
}

let REVIEW_STATUS = {
    PENDING:"pending",
    DONE:"done"
}

let RULE_MAP_WARNIINGS = {
    CELL_ADD : "New rule on this cell has been identified by system. Click Confirm to remove warning.",
    CELL_DELETE : "Rule on this cell doesn't exist as per the new document. Click Confirm to delete this rule.",
    FEEDBACK_1 :  "Content has been updated. Click the Feedback icon on the “Scoring Rules” page to review and confirm the customized feedback or ",
    FEEDBACK_2 : " to launch the Feedback dialog.",
    HINTS_1 :  "Content has been updated. Click the Hint icon on the “Scoring Rules” page to review and confirm the configured hints or ",
    HINTS_2 : " to launch the Hint dialog."
}

let SORT_OPTIONS = {
    TYPE: 'Type',
    TITLE: 'Title',
    RECENTLY_USED: 'Recently Used',
    RELEVANCE: 'Relevance'
}

let DASHBOARD = {
    FIELDS: "itemId,publishId,meta,template,type,state,status",
    FACETS: "types,domain,difficulty,custom"
}

let SCORING_STRATEGY = {
    inorder: {
        matchType: 0,
        weights: {
            rowStrategy: {
                cellWeight: 100,
                textWeight: 0
            },
            cellStrategy: {
                cellWeight: 100,
                textWeight: 0
            }  
        }
    },
    outorder: {
        matchType: 1,
        weights: {
            rowStrategy: {
                cellWeight: 20,
                textWeight: 80
            },
            cellStrategy: {
                cellWeight: 20,
                textWeight: 80
            }  
        }
    },
    custom: {
        matchType: 2,
        weights: {
            rowStrategy: {
                cellWeight: 0,
                textWeight: 100
            },
            cellStrategy: {
                cellWeight: 0,
                textWeight: 100
            }
        }
    }
}

let CELL_PANEL_MESSAGES = {
    DELETE : "Are you sure you want to delete this scoring rule?",
    DELETE_GROUP : "This is last item of group, Are you sure you want to delete this group?",
    EJECT : "Are you sure you want to remove this scoring rule?"
}

let SEARCH = {
    TAG_TEXT:"text: "
}

let PLAYER_DISPLAY_MODE = {
    SPREADSHEET: "spreadsheet",
    TABULAR: "tabular"
}
let DASHBOARD_QUERY_PARAMS = {
    ITEMS: "items",
    SORT: "sort",
    SEARCH: "search",
    FILTERS:{
        TYPES: "types",
        DOMAIN: "domain",
        DIFFICULTY: "difficulty",
        CUSTOM: "custom",
    },
    
    PAGE: "p"
}

let ADD_RULE = {
    MULTIPLE_CELL : "As per final document"
}

let CONSTANTS = Object.freeze({
    ITEM_SCHEMA: ITEM_SCHEMA,
    PAINT_MODE: PAINT_MODE,
    OVER_ALL_STATUS: OVER_ALL_STATUS,
    ITEM_SOURCE: ITEM_SOURCE,
    ITEM_STATUS: ITEM_STATUS,
    ITEM_STATE: ITEM_STATE,
    ITEM_TYPE: ITEM_TYPE,
    EDITOR_TYPE: EDITOR_TYPE,
    ERROR_MESSAGE:ERROR_MESSAGE,
    CONFIRMATION_MESSAGE:CONFIRMATION_MESSAGE,
    INFO_MESSAGE:INFO_MESSAGE,
    HINT_TYPE,  
    HINT_SCHEME,
    GROUP_MESSAGE,
    UNGROUP_MESSAGE,
    HINT_FORM_MESSAGE,
    RESOURCE_TYPE,
    REVIEW_STATUS,
    RULE_MAP_WARNIINGS,
    CHANGE_SET_TYPE,
    SORT_OPTIONS,
    DASHBOARD,
    SCORING_STRATEGY,
    CELL_PANEL_MESSAGES,
    SEARCH,
    PLAYER_DISPLAY_MODE,
    DASHBOARD_QUERY_PARAMS,
    ADD_RULE
});

export {CONSTANTS};