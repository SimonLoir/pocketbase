<script>
    import CommonHelper from "@/utils/CommonHelper";
    import tooltip from "@/actions/tooltip";
    import Field from "@/components/base/Field.svelte";
    import ObjectSelect from "@/components/base/ObjectSelect.svelte";
    import SchemaField from "@/components/collections/schema/SchemaField.svelte";
    import MultipleValueInput from "@/components/base/MultipleValueInput.svelte";

    export let field;
    export let key = "";

    const isSingleOptions = [
        { label: "Single", value: true },
        { label: "Multiple", value: false },
    ];

    let isSingle = field.options?.maxSelect <= 1;
    let oldIsSingle = isSingle;

    $: if (CommonHelper.isEmpty(field.options)) {
        loadDefaults();
    }

    $: if (oldIsSingle != isSingle) {
        oldIsSingle = isSingle;
        if (isSingle) {
            field.options.maxSelect = 1;
        } else {
            field.options.maxSelect = field.options?.values?.length || 2;
        }
    }

    function loadDefaults() {
        field.options = {
            maxSelect: 1,
            values: [],
        };
        isSingle = true;
        oldIsSingle = isSingle;
    }
</script>

<SchemaField
    bind:field
    {key}
    on:rename
    on:remove
    on:drop
    on:dragstart
    on:dragenter
    on:dragleave
    {...$$restProps}
>
    <svelte:fragment let:interactive>
        <Field
            class="form-field required {!interactive ? 'disabled' : ''}"
            inlineError
            name="schema.{key}.options.values"
            let:uniqueId
        >
            <div use:tooltip={{ text: "Choices (comma separated)", position: "top-left", delay: 700 }}>
                <MultipleValueInput
                    id={uniqueId}
                    placeholder="Choices: eg. optionA, optionB"
                    required
                    disabled={!interactive}
                    bind:value={field.options.values}
                />
            </div>
        </Field>
        <Field
            class="form-field form-field-single-multiple-select {!interactive ? 'disabled' : ''}"
            inlineError
            let:uniqueId
        >
            <ObjectSelect
                id={uniqueId}
                items={isSingleOptions}
                disabled={!interactive}
                bind:keyOfSelected={isSingle}
            />
        </Field>
    </svelte:fragment>

    <svelte:fragment slot="options">
        {#if !isSingle}
            <Field class="form-field required" name="schema.{key}.options.maxSelect" let:uniqueId>
                <label for={uniqueId}>Max select</label>
                <input
                    id={uniqueId}
                    type="number"
                    step="1"
                    min="2"
                    required
                    bind:value={field.options.maxSelect}
                />
            </Field>
        {/if}
    </svelte:fragment>
</SchemaField>
