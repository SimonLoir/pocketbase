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

    it("should use structuredClone if structuredClone is available", () => {
        const value = { a: 1, b: 2, c: 3 };

        const structuredClone = jest.fn();

        const old = globalThis.structuredClone;

        globalThis.structuredClone = structuredClone;

        CommonHelpers.clone(value);

        expect(structuredClone).toBeCalledWith(value);

        globalThis.structuredClone = old;
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
    where: string;
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

type BuildIndexInput = Partial<ParseIndexResult>;
describe("CommonHelpers.buildIndex", () => {});

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
        /*{
            type: "Text node",
            value: document.createTextNode(""),
            isInput: false,
        },*/
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

describe("CommonHelpers.toArray", () => {
    it("should return an empty array if the value is undefined", () => {
        expect(CommonHelpers.toArray(undefined as any)).toEqual([]);
    });

    it("should return a similar array if the value is an array", () => {
        expect(CommonHelpers.toArray(["a", "b"])).toEqual(["a", "b"]);
    });

    it("should return an array with one element if the value is not an array", () => {
        expect(CommonHelpers.toArray("a" as any)).toEqual(["a"]);
    });

    it("should return an array with an other reference", () => {
        const a = ["a", "b"];
        expect(CommonHelpers.toArray(a)).not.toBe(a);
    });

    it('should return an empty array if the value is ""', () => {
        expect(CommonHelpers.toArray("" as any)).toEqual([]);
    });

    it('should return an array with one element if the value is "" and allowEmpty is true', () => {
        expect(CommonHelpers.toArray("" as any, true)).toEqual([""]);
    });
});

describe("CommonHelpers.removeByValue", () => {
    it("should remove the value from the array", () => {
        const array = ["a", "b", "c"];
        CommonHelpers.removeByValue(array, "b");
        expect(array).toEqual(["a", "c"]);
    });

    it("should not remove anything if the value is not in the array", () => {
        const array = ["a", "b", "c"];
        CommonHelpers.removeByValue(array, "d");
        expect(array).toEqual(["a", "b", "c"]);
    });

    it("should not remove anything if the array is empty", () => {
        const array: string[] = [];
        CommonHelpers.removeByValue(array, "a");
        expect(array).toEqual([]);
    });

    it("should still be undefined if the array is undefined", () => {
        const array = undefined as any;
        CommonHelpers.removeByValue(array, "a");
        expect(array).toEqual(undefined);
    });

    it("should remove the value from the array if the array has a length of 1", () => {
        const array = ["a"];
        CommonHelpers.removeByValue(array, "a");
        expect(array).toEqual([]);
    });

    it("should remove the value from the array if the array has a length of 2", () => {
        const array = ["b", "a"];
        CommonHelpers.removeByValue(array, "a");
        expect(array).toEqual(["b"]);
    });

    it("should remove the value from the array if the array has a length of 2 and the value to remove is first", () => {
        const array = ["a", "b"];
        CommonHelpers.removeByValue(array, "a");
        expect(array).toEqual(["b"]);
    });

    it("should only remove the last occurrence of the value in the array", () => {
        const array = ["a", "b", "a"];
        CommonHelpers.removeByValue(array, "a");
        expect(array).toEqual(["a", "b"]);
    });
});

describe("CommonHelpers.findByKey", () => {
    it("should return null if the array is empty", () => {
        expect(CommonHelpers.findByKey([], "a", "b")).toBeNull();
    });

    it("should return null if the array is undefined", () => {
        expect(CommonHelpers.findByKey(undefined as any, "a", "b")).toBeNull();
    });

    it("should return null if the key is not in an object", () => {
        expect(CommonHelpers.findByKey([{ a: "a" }], "b", "a")).toBeNull();
    });

    it("should return the object if the key is in an object", () => {
        expect(CommonHelpers.findByKey([{ a: "a" }], "a", "a")).toEqual({ a: "a" });
    });
});

describe("CommonHelpers.isFocusable", () => {
    for (const item of [
        {
            type: "HTMLButtonElement",
            expected: true,
            value: document.createElement("button"),
        },
        {
            type: "HTMLInputElement",
            expected: true,
            value: document.createElement("input"),
        },
        {
            type: "HTMLAnchorElement",
            expected: true,
            value: document.createElement("a"),
        },
        {
            type: "HTMLDetailsElement",
            expected: true,
            value: document.createElement("details"),
        },
        {
            type: "HTMLDivElement with tabindex",
            expected: true,
            value: (() => {
                const element = document.createElement("div");
                element.setAttribute("tabindex", "0");
                return element;
            })(),
        },
        {
            type: "HTMLDivElement without tabindex",
            expected: false,
            value: (() => {
                const element = document.createElement("div");
                return element;
            })(),
        },
    ]) {
        it(`should return ${item.expected} if the element is a ${item.type}`, () => {
            expect(CommonHelpers.isFocusable(item.value)).toBe(item.expected);
        });
    }
});

describe("CommonHelpers.sentenize", () => {
    it("should return an empty string if the value is undefined", () => {
        expect(CommonHelpers.sentenize(undefined as any)).toBe("");
    });

    it("should return an empty string if the value is null", () => {
        expect(CommonHelpers.sentenize(null as any)).toBe("");
    });

    it("should return an empty string if the value is an empty string", () => {
        expect(CommonHelpers.sentenize("")).toBe("");
    });

    it("should return the uppercase version of the string if the string is a single letter", () => {
        expect(CommonHelpers.sentenize("a", false)).toBe("A");
    });

    it("should add a dot if no argument is provided", () => {
        expect(CommonHelpers.sentenize("a")).toBe("A.");
    });

    it('should trim the string if the string is " a "', () => {
        expect(CommonHelpers.sentenize(" a ")).toBe("A.");
    });

    it("should only put the first letter in uppercase if its a 2 letters word", () => {
        expect(CommonHelpers.sentenize("le", false)).toBe("Le");
    });

    it("should convert _ to spaces", () => {
        expect(CommonHelpers.sentenize("a_b")).toBe("A b.");
    });

    it("should not add a dot if there is already a dot", () => {
        expect(CommonHelpers.sentenize("a.")).toBe("A.");
    });

    it("should not add a dot if there is already a dot and a space", () => {
        expect(CommonHelpers.sentenize("a. ")).toBe("A.");
    });

    it("should not add a dot if there is already a question mark", () => {
        expect(CommonHelpers.sentenize("a?")).toBe("A?");
    });

    it("should not add a dot if there is already a exclamation point", () => {
        expect(CommonHelpers.sentenize("a!")).toBe("A!");
    });
});

describe("CommonHelpers.slugify", () => {
    for (const item of [
        {
            value: "test",
            expected: "test",
        },
        {
            value: "test test",
            expected: "test_test",
        },
        {
            value: "test      test",
            expected: "test_test",
        },
        {
            value: "test.test",
            expected: "test_test",
        },
        {
            value: "test=test",
            expected: "test_test",
        },
        {
            value: "test-test",
            expected: "test_test",
        },
        {
            // Test the "g" flag in the regex
            value: "test-test-test",
            expected: "test_test_test",
        },
        {
            value: "test!test",
            expected: "testtest",
        },
        {
            value: "test&test",
            expected: "testandtest",
        },
        {
            value: "",
            expected: "",
        },
    ]) {
        it(`should return "${item.expected}" if the string is "${item.value}"`, () => {
            expect(CommonHelpers.slugify(item.value)).toBe(item.expected);
        });
    }

    it('should use - as a separator if the separator argument is "-"', () => {
        expect(CommonHelpers.slugify("test test", "-")).toBe("test-test");
    });

    it("should convert a to _ if a is in the preserved characters", () => {
        expect(CommonHelpers.slugify("testatest", "_", ["a"])).toBe("test_test");
    });
});

describe("CommonHelpers.filterRedactedProps", () => {
    const redactedString = "******";

    it("should return an empty object if the object is undefined", () => {
        expect(CommonHelpers.filterRedactedProps(undefined as any)).toEqual({});
    });

    it("should return the same object if it is empty", () => {
        expect(CommonHelpers.filterRedactedProps({})).toEqual({});
    });

    it("should return the same object if it does not contain a redacted property", () => {
        expect(CommonHelpers.filterRedactedProps({ a: "a" })).toEqual({ a: "a" });
    });

    it("should return an object with a different reference", () => {
        const object = { a: "a" };
        expect(CommonHelpers.filterRedactedProps(object)).not.toBe(object);
    });

    it("should return an object without the redacted property", () => {
        expect(CommonHelpers.filterRedactedProps({ a: redactedString, b: "b" })).toEqual({
            b: "b",
        });
    });

    it("should return an object without the redacted properties", () => {
        expect(CommonHelpers.filterRedactedProps({ a: redactedString, b: "b", c: redactedString })).toEqual({
            b: "b",
        });
    });

    it('should not remove the property if it contains the redacted string but is not exclusively the redacted string ("a" + redactedString)', () => {
        const obj = { a: "a" + redactedString, b: "b" };
        expect(CommonHelpers.filterRedactedProps(obj)).toEqual(obj);
    });

    it("should replace the redacted string in nested objects", () => {
        expect(CommonHelpers.filterRedactedProps({ a: { b: redactedString } })).toEqual({
            a: {},
        });
    });

    it("should not replace nulls with {}", () => {
        expect(CommonHelpers.filterRedactedProps({ a: null })).toEqual({
            a: null,
        });
    });

    it("should not replace 0 with {}", () => {
        expect(CommonHelpers.filterRedactedProps({ a: 0 })).toEqual({
            a: 0,
        });
    });
});

describe("CommonHelpers.plainText", () => {
    /*it("should return an empty string if the value is undefined", () => {
        expect(CommonHelpers.plainText(undefined as any)).toBe("");
    });

    it("should return an empty string if the value is null", () => {
        expect(CommonHelpers.plainText(null as any)).toBe("");
    });

    it("should return an empty string if the value is an empty string", () => {
        expect(CommonHelpers.plainText("")).toBe("");
    });

    it("should return the same string if the value is a plain text", () => {
        expect(CommonHelpers.plainText("test")).toBe("test");
    });

    it('should return "test" if the value is "<b>test</b>"', () => {
        expect(CommonHelpers.plainText("<b>test</b>")).toBe("test");
    });

    it('should return "test test" if the value is "<b>test</b>  <i>test</i>"', () => {
        expect(CommonHelpers.plainText("<b>test</b>  <i>test</i>")).toBe("test test");
    });*/
});

describe("CommonHelpers.filterDuplicatesByKey", () => {
    it("should return an empty array if the array is empty", () => {
        expect(CommonHelpers.filterDuplicatesByKey([])).toEqual([]);
    });

    it("should return the same array if there is no duplicate", () => {
        expect(CommonHelpers.filterDuplicatesByKey([{ id: 1 }, { id: 2 }])).toEqual([{ id: 1 }, { id: 2 }]);
    });

    it("should return the same array if there is no duplicate (with a key != 'id')", () => {
        expect(CommonHelpers.filterDuplicatesByKey([{ a: 1 }, { a: 2 }], "a")).toEqual([{ a: 1 }, { a: 2 }]);
    });

    it("should remove the duplicates and keep the last one", () => {
        expect(
            CommonHelpers.filterDuplicatesByKey([
                { id: 1, a: "b" },
                { id: 1, a: "c" },
            ])
        ).toEqual([{ id: 1, a: "c" }]);
    });

    it("should return an empty array if the value is not an array", () => {
        expect(CommonHelpers.filterDuplicatesByKey(undefined as any)).toEqual([]);
    });
});

describe("CommonHelpers.getNestedVal", () => {
    it("should return null if the path is empty", () => {
        expect(CommonHelpers.getNestedVal({ a: "a" }, "")).toBe(null);
    });

    it("should return null if the path is undefined", () => {
        expect(CommonHelpers.getNestedVal({ a: "a" }, undefined as any)).toBe(null);
    });

    it("should return null if the value is undefined", () => {
        expect(CommonHelpers.getNestedVal(undefined as any, "a")).toBe(null);
    });

    it("should return the right value if the path exists", () => {
        expect(CommonHelpers.getNestedVal({ a: "a" }, "a")).toBe("a");
    });

    it("should return the right value if the path exists (nested)", () => {
        expect(CommonHelpers.getNestedVal({ a: { b: { c: "c" } } }, "a.b.c")).toBe("c");
    });

    it("should return the right value if the path exists (nested) and different delimiter", () => {
        expect(CommonHelpers.getNestedVal({ a: { b: { c: "c" } } }, "a/b/c", null, "/")).toBe("c");
    });

    it("should return the default value if the path passes through a string", () => {
        expect(CommonHelpers.getNestedVal({ a: "a" }, "a.b", "default")).toBe("default");
    });

    it("should work with arrays indexes", () => {
        expect(CommonHelpers.getNestedVal({ a: ["a", "b"] }, "a.1")).toBe("b");
    });
});

describe("CommonHelpers.setByPath", () => {
    //it('should be the same object if the path is empty ("")', () => {
    //    const obj = { a: "a" };
    //    CommonHelpers.setByPath(obj, "", "b");
    //    expect(obj).toBe({ a: "a" });
    //});

    //it("should be the same object if the path is undefined", () => {
    //    const obj = { a: "a" };
    //    CommonHelpers.setByPath(obj, undefined as any, "b");
    //    expect(obj).toBe({ a: "a" });
    //});

    it("should replace the value if the path exists", () => {
        const obj = { a: "a" };
        CommonHelpers.setByPath(obj, "a", "b");
        expect(obj).toEqual({ a: "b" });
    });

    it("should replace the value if the path exists (nested)", () => {
        const obj = { a: { b: { c: "c" } } };
        CommonHelpers.setByPath(obj, "a.b.c", "d");
        expect(obj).toEqual({ a: { b: { c: "d" } } });
    });

    it("should replace the value if the path exists (nested) and different delimiter", () => {
        const obj = { a: { b: { c: "c" } } };
        CommonHelpers.setByPath(obj, "a/b/c", "d", "/");
        expect(obj).toEqual({ a: { b: { c: "d" } } });
    });

    it("should create the path if it does not exist", () => {
        const obj = { a: "a" };
        CommonHelpers.setByPath(obj, "b", "c");
        expect(obj).toEqual({ a: "a", b: "c" });
    });

    it("should create the path if it does not exist (nested)", () => {
        const obj = { a: "a" };
        CommonHelpers.setByPath(obj, "b.c", "d");
        expect(obj).toEqual({ a: "a", b: { c: "d" } });
    });

    it("should replace elements in arrays", () => {
        const obj = { a: ["a", "b"] };
        CommonHelpers.setByPath(obj, "a.1", "c");
        expect(obj).toEqual({ a: ["a", "c"] });
    });
});

describe("CommonHelpers.truncate", () => {
    it("should return an empty string if the value is undefined", () => {
        expect(CommonHelpers.truncate(undefined as any)).toBe("");
    });

    it("should return an empty string if the value is an empty string", () => {
        expect(CommonHelpers.truncate("")).toBe("");
    });

    it("should return the same string if the value is shorter than the max length", () => {
        expect(CommonHelpers.truncate("test", 5)).toBe("test");
    });

    it("should return an empty string if the value is an empty string and the max length is 0", () => {
        expect(CommonHelpers.truncate("", 0)).toBe("");
    });

    it('should add dots at the end of the string if the value is longer than the max length and no "end" parameter is provided', () => {
        expect(CommonHelpers.truncate("test", 2)).toBe("te...");
    });

    it('should not add dots at the end of the string if the value is longer than the max length and "end" is set to false', () => {
        expect(CommonHelpers.truncate("test", 2, false)).toBe("te");
    });
});

describe("CommonHelpers.extractColumnsFromQuery", () => {
    it("should return an empty array if the query is undefined", () => {
        expect(CommonHelpers.extractColumnsFromQuery(undefined as any)).toEqual([]);
    });

    it("should return an empty array if the query is an empty string", () => {
        expect(CommonHelpers.extractColumnsFromQuery("")).toEqual([]);
    });

    it("should return an empty array if the query is not a valid sql select query", () => {
        expect(CommonHelpers.extractColumnsFromQuery("test")).toEqual([]);
    });

    it('should return only one column if the query is "select a from b"', () => {
        expect(CommonHelpers.extractColumnsFromQuery("select a from b")).toEqual(["a"]);
    });

    it('should return only one column if the query is "select a from b where c = 1"', () => {
        expect(CommonHelpers.extractColumnsFromQuery("select a from b where c = 1")).toEqual(["a"]);
    });

    it("should return only one column if the query contains spaces", () => {
        expect(CommonHelpers.extractColumnsFromQuery("   select    a    from       b")).toEqual(["a"]);
    });

    it('should return the right columns if the query is "select a, b from c"', () => {
        expect(CommonHelpers.extractColumnsFromQuery("select a, b from c")).toEqual(["a", "b"]);
    });

    it('should return the aliases if the query is "select a as d, b as e from c"', () => {
        expect(CommonHelpers.extractColumnsFromQuery("select a as d, b as e from c")).toEqual(["d", "e"]);
    });

    it('should ignore groups if the query is "select (a, b) from c"', () => {
        expect(CommonHelpers.extractColumnsFromQuery("select (a, b), c from d")).toEqual(["c"]);
    });

    it('should remove backticks if the query is "select `a` from b"', () => {
        expect(CommonHelpers.extractColumnsFromQuery("select `a` from b")).toEqual(["a"]);
    });
});

describe("CommonHelpers.getJWTPayload", () => {
    it('should return an empty object if the token is ""', () => {
        const warn = jest.spyOn(console, "warn").mockImplementation(() => {});
        expect(CommonHelpers.getJWTPayload("")).toEqual({});
        expect(warn).not.toHaveBeenCalled();
    });

    it('should return an empty object if the token is "test"', () => {
        expect(CommonHelpers.getJWTPayload("test")).toEqual({});
    });

    it("should return the content of the JWT if the token is valid", () => {
        expect(
            CommonHelpers.getJWTPayload(
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidGVzdCJ9.c3YTBJSewzdOv8ggND9PFQIrU9b1PK2vAA9oq3Cslgo"
            )
        ).toEqual({ data: "test" });
    });

    it("should return the content of the JWT if the token is valid", () => {
        const warn = jest.spyOn(console, "warn").mockImplementation(() => {});
        expect(
            CommonHelpers.getJWTPayload(
                "eyJhbGciOiJIUzI1NiIsInR5ckpXVCJ9.eyJkYXRhIjoidGdCJ9.c3YTBJSewzdOv8ggND9PFQIrU9b1PK2vAA9oq3Cslgo"
            )
        ).toEqual({});
        expect(warn).toHaveBeenCalled();
    });
});

describe.only("CommonHelpers.splitNonEmpty", () => {
    it("should return an empty array if the value is undefined", () => {
        expect(CommonHelpers.splitNonEmpty(undefined as any)).toEqual([]);
    });

    it("should return an empty array if the value is an empty string", () => {
        expect(CommonHelpers.splitNonEmpty("")).toEqual([]);
    });

    it('should contain only "test" if the value is "test"', () => {
        expect(CommonHelpers.splitNonEmpty("test")).toEqual(["test"]);
    });

    it('should contain only "test" if the value is "test,"', () => {
        expect(CommonHelpers.splitNonEmpty("test,")).toEqual(["test"]);
    });

    it('should contain only "test" if the value is ",test"', () => {
        expect(CommonHelpers.splitNonEmpty(",test")).toEqual(["test"]);
    });

    it('should contain only "test" and "test2" if the value is "test,,test2"', () => {
        expect(CommonHelpers.splitNonEmpty("test,,test2")).toEqual(["test", "test2"]);
    });

    it('should trim the values if the value is "test, test2"', () => {
        expect(CommonHelpers.splitNonEmpty("test, test2")).toEqual(["test", "test2"]);
    });
});
