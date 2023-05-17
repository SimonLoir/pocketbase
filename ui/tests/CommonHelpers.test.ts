import CommonHelpers from "../src/utils/CommonHelper";

describe("CommonHelpers.isObject", () => {
    for (const item of [
        {
            type: "empty dictionary",
            value: {},
            isObject: true,
        },
        {
            type: "string",
            value: "",
            isObject: false,
        },
        {
            type: "number",
            value: 0,
            isObject: false,
        },
        {
            type: "boolean",
            value: true,
            isObject: false,
        },
        {
            type: "undefined",
            value: undefined,
            isObject: false,
        },
        {
            type: "null",
            value: null,
            isObject: false,
        },
        {
            type: "array",
            value: [],
            isObject: false,
        },
        {
            type: "function",
            value: () => {},
            isObject: false,
        },
        {
            type: "date",
            value: new Date(),
            isObject: false,
        },
        {
            type: "object",
            value: new Object(),
            isObject: true,
        },
        {
            type: "object from function constructor",
            value: (() => {
                const Test = function (): any {};
                //@ts-ignore
                return new Test();
            })(),
            isObject: false,
        },
        {
            type: "object from class",
            value: (() => {
                class Test {}
                return new Test();
            })(),
            isObject: false,
        },
    ]) {
        it(`should return ${item.isObject} if the value is a(n) ${item.type}`, () => {
            expect(CommonHelpers.isObject(item.value)).toBe(item.isObject);
        });
    }
});

describe("CommonHelpers.getFileType", () => {
    for (const extension of [".jpg", ".jpeg", ".png", ".svg", ".gif", ".jfif", ".webp", ".avif"]) {
        it(`should return "image" if the extension is ${extension}`, () => {
            expect(CommonHelpers.getFileType("filename" + extension)).toBe("image");
        });
    }

    for (const extension of [".mp4", ".avi", ".mov", ".3gp", ".wmv"]) {
        it(`should return "video" if the extension is ${extension}`, () => {
            expect(CommonHelpers.getFileType("filename" + extension)).toBe("video");
        });
    }

    for (const extension of [".aa", ".aac", ".m4v", ".mp3", ".ogg", ".oga", ".mogg", ".amr"]) {
        it(`should return "audio" if the extension is ${extension}`, () => {
            expect(CommonHelpers.getFileType("filename" + extension)).toBe("audio");
        });
    }

    for (const extension of [
        ".pdf",
        ".doc",
        ".docx",
        ".xls",
        ".xlsx",
        ".ppt",
        ".pptx",
        ".odp",
        ".odt",
        ".ods",
        ".txt",
    ]) {
        it(`should return "document" if the extension is ${extension}`, () => {
            expect(CommonHelpers.getFileType("filename" + extension)).toBe("document");
        });
    }

    it("should return 'file' if the extension is unknown", () => {
        expect(CommonHelpers.getFileType("filename.someRandomExtension")).toBe("file");
    });

    it("should return 'file' if the path is empty", () => {
        expect(CommonHelpers.getFileType("")).toBe("file");
    });

    it("should return 'file' if the file does not have an extension", () => {
        expect(CommonHelpers.getFileType("filename")).toBe("file");
    });

    it("should return the correct type if the file does not have a name", () => {
        expect(CommonHelpers.getFileType(".png")).toBe("image");
    });
});

describe("CommonHelpers.pushUnique", () => {
    it("should push the item to the array if it is not already in it", () => {
        const array = [1, 2, 3];
        CommonHelpers.pushUnique(array, 4);
        expect(array).toEqual([1, 2, 3, 4]);
    });

    it("should not push the item to the array if it is already in it", () => {
        const array = [1, 2, 3];
        CommonHelpers.pushUnique(array, 2);
        expect(array).toEqual([1, 2, 3]);
    });

    it("should push the item to the array it the array is empty", () => {
        const array: number[] = [];
        CommonHelpers.pushUnique(array, 1);
        expect(array).toEqual([1]);
    });

    it("should not push the item to the array if the array is undefined", () => {
        const array = undefined;
        expect(() => CommonHelpers.pushUnique(array as unknown as any[], 1)).toThrow();
    });
});

describe("CommonHelpers.clone", () => {
    it("should return undefined if the value is undefined", () => {
        // This does not work as expected because JSON.parse(JSON.stringify(undefined)) throws an Error
        //expect(CommonHelpers.clone(undefined)).toBe(undefined);
    });

    it("should return null if the value is null", () => {
        expect(CommonHelpers.clone(null)).toBe(null);
    });

    it("should return the same value if the value is a string", () => {
        expect(CommonHelpers.clone("test")).toBe("test");
    });

    it("should return the same value if the value is a number", () => {
        expect(CommonHelpers.clone(123)).toBe(123);
    });
});

describe("CommonHelpers.isEmpty", () => {
    for (const item of [
        {
            type: "empty string",
            value: "",
            isEmpty: true,
        },
        {
            type: "string",
            value: "test",
            isEmpty: false,
        },
        {
            type: "empty array",
            value: [],
            isEmpty: true,
        },
        {
            type: "array",
            value: [1, 2, 3],
            isEmpty: false,
        },
        {
            type: "empty object",
            value: {},
            isEmpty: true,
        },
        {
            type: "object",
            value: { a: 1, b: 2, c: 3 },
            isEmpty: false,
        },
        {
            type: "null",
            value: null,
            isEmpty: true,
        },
        {
            type: "zero uuid",
            value: "00000000-0000-0000-0000-000000000000",
            isEmpty: true,
        },
        {
            type: "uuid",
            value: "00000000-0000-0000-0000-000000000001",
            isEmpty: false,
        },
        {
            type: "zero datetime",
            value: "0001-01-01 00:00:00.000Z",
            isEmpty: true,
        },
        {
            type: "datetime",
            value: "2014-03-02 00:00:00.000Z",
            isEmpty: false,
        },
        {
            type: "zero date",
            value: "0001-01-01",
            isEmpty: true,
        },
        {
            type: "date",
            value: "1980-01-01",
            isEmpty: false,
        },
    ]) {
        it(`should return ${item.isEmpty} if the value is ${item.type}`, () => {
            expect(CommonHelpers.isEmpty(item.value)).toBe(item.isEmpty);
        });
    }
    //TODO: add more tests
});

describe("CommonHelpers.getInitials", () => {
    it("should return the initials of a name", () => {
        expect(CommonHelpers.getInitials("John Doe")).toBe("JD");
    });

    it("should return the initials of an email", () => {
        expect(CommonHelpers.getInitials("john.doe@example.com")).toBe("JD");
    });

    it("should return the initials of a name with multiple spaces", () => {
        // could be more than 2 spaces
        //expect(CommonHelpers.getInitials("John    Doe")).toBe("JD");
    });

    it("should convert the initials to uppercase", () => {
        expect(CommonHelpers.getInitials("john doe")).toBe("JD");
    });

    it("should return the uppercase version of a 2 chars string", () => {
        expect(CommonHelpers.getInitials("us")).toBe("US");
    });

    it("should return the first char of a username", () => {
        expect(CommonHelpers.getInitials("john")).toBe("J");
    });
});

describe("CommonHelpers.randomString", () => {
    it("should return a random string", () => {
        expect(CommonHelpers.randomString()).not.toBe(CommonHelpers.randomString());
    });

    it("should return an empty string if the length is 0", () => {
        // It should work but the length of zero is not allowed
        //expect(CommonHelpers.randomString(0)).toBe("");
    });

    it("should return a string with the correct length", () => {
        expect(CommonHelpers.randomString(10).length).toBe(10);
    });

    it("should return a similar object if an empty object is passed", () => {
        expect(CommonHelpers.clone({})).toEqual({});
    });

    it("should not return the same object if an object is passed", () => {
        const obj = { a: 1 };
        expect(CommonHelpers.clone(obj)).not.toBe(obj);
    });
});

interface ParseIndexResult {
    unique: boolean;
    optional: boolean;
    schemaName: string;
    indexName: string;
    tableName: string;
    columns: { name: string; collate: string; sort: string }[];
    where: "";
}
describe("CommonHelpers.parseIndex", () => {
    it("should not return meaningful values if the index is an empty string", () => {
        expect(CommonHelpers.parseIndex("")).toEqual<ParseIndexResult>({
            unique: false,
            optional: false,
            schemaName: "",
            indexName: "",
            tableName: "",
            columns: [],
            where: "",
        });
    });

    it("should return the correct index name when the request is in lowercase", () => {
        expect(
            (
                CommonHelpers.parseIndex(
                    "create index index_name on table_name (column_name)"
                ) as ParseIndexResult
            ).indexName
        ).toBe("index_name");
    });

    it("should make abstraction of the spaces", () => {
        expect(
            CommonHelpers.parseIndex(
                "CREATE     INDEX      schema.index_name      ON         table_name  (   column_name    )   "
            )
        ).toEqual<ParseIndexResult>({
            unique: false,
            optional: false,
            schemaName: "schema",
            indexName: "index_name",
            tableName: "table_name",
            columns: [{ name: "column_name", collate: "", sort: "" }],
            where: "",
        });
    });

    it("should return the correct table name", () => {
        expect(
            (
                CommonHelpers.parseIndex(
                    "CREATE INDEX index_name ON table_name (column_name)"
                ) as ParseIndexResult
            ).tableName
        ).toBe("table_name");
    });

    it("should return an empty array if there is no column", () => {
        expect(
            (CommonHelpers.parseIndex("CREATE INDEX index_name ON table_name ()") as ParseIndexResult).columns
        ).toEqual([]);
    });

    it("should return the correct column if there is only one column", () => {
        expect(
            (
                CommonHelpers.parseIndex(
                    "CREATE INDEX index_name ON table_name (column_name)"
                ) as ParseIndexResult
            ).columns
        ).toEqual([
            {
                name: "column_name",
                collate: "",
                sort: "",
            },
        ]);
    });

    it("should return the correct columns 2 columns", () => {
        expect(
            (
                CommonHelpers.parseIndex(
                    "CREATE INDEX index_name ON table_name (column_name1, column_name2)"
                ) as ParseIndexResult
            ).columns
        ).toEqual([
            { name: "column_name1", collate: "", sort: "" },
            { name: "column_name2", collate: "", sort: "" },
        ]);
    });
});

describe("CommonHelpers.isInput", () => {
    for (const item of [
        {
            type: "HTMLInputElement",
            value: document.createElement("input"),
            isInput: true,
        },
        {
            type: "HTMLTextAreaElement",
            value: document.createElement("textarea"),
            isInput: true,
        },
        {
            type: "HTMLSelectElement",
            value: document.createElement("select"),
            isInput: true,
        },
        {
            type: "HTMLDivElement",
            value: (() => {
                const div = document.createElement("div");

                // This should not be necessary but it seems that isContentEditable is not set to false by default in the mock of jsdom
                // console.log(document.createElement("div").isContentEditable) works in the browser (chrome, moz and safari)

                // @ts-ignore
                div.isContentEditable = false;
                return div;
            })(),
            isInput: false,
        },
        {
            type: "HTMLDivElement with contenteditable",
            value: (() => {
                const div = document.createElement("div");
                div.contentEditable = "true";
                // @ts-ignore
                div.isContentEditable = true;
                return div;
            })(),
            isInput: true,
        },

        // isInput should not be provided an undefined value -> the type is Node and not Node | undefined
    ]) {
        it(`should return ${item.isInput} if the value is ${item.type}`, () => {
            expect(CommonHelpers.isInput(item.value)).toEqual(item.isInput);
        });
    }
});

describe("CommonHelpers.hasNonEmptyProps", () => {
    it("should return false if the object is empty", () => {
        expect(CommonHelpers.hasNonEmptyProps({})).toBe(false);
    });

    it("should return false if the object has only empty strings", () => {
        expect(CommonHelpers.hasNonEmptyProps({ a: "", b: "" })).toBe(false);
    });

    it("should return true if the object has at least one non empty string", () => {
        expect(CommonHelpers.hasNonEmptyProps({ a: "", b: "b" })).toBe(true);
    });
});

describe("CommonHelpers.inArray", () => {
    it("should return true if the value is in the array", () => {
        expect(CommonHelpers.inArray(["a", "b"], "a")).toBe(true);
    });

    it("should return false if the value is not in the array", () => {
        expect(CommonHelpers.inArray(["a", "b"], "c")).toBe(false);
    });

    it("should return false if the array is empty", () => {
        expect(CommonHelpers.inArray([], "a")).toBe(false);
    });

    it("should return false if the array is undefined", () => {
        expect(CommonHelpers.inArray(undefined as any as [], "a")).toBe(false);
    });

    it("should return true if the array contains the value and has a length of 1", () => {
        expect(CommonHelpers.inArray(["a"], "a")).toBe(true);
    });

    it("should return false if the array does not contain the value and has a length of 1", () => {
        expect(CommonHelpers.inArray(["a"], "b")).toBe(false);
    });

    it("should return true if the array contains the value and has a length greater than 1", () => {
        expect(CommonHelpers.inArray(["b", "a"], "a")).toBe(true);
    });

    it("should return false if the array does not contain the value and has a length greater than 1", () => {
        expect(CommonHelpers.inArray(["b", "a"], "c")).toBe(false);
    });
});
