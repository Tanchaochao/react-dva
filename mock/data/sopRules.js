const sopRules = [
  {
    paramName: 'aa',
    type: 'TEXT',
    rule: {
      paramName: 'aa',
      title: {
        value: [
          'Features',
        ],
        logicalOperator: 'and',
      },
      left: {
        value: [
          'Lowpowerdissipation:lcc=1u',
        ],
        logicalOperator: 'and',
      },
      right: {
        value: [
          'atTa=25',
        ],
        logicalOperator: 'and',
      },
      commands: [
        'extractNumber,',
        'extractMinNumber',
      ],
    },
    uiSelectInfo: {
      title: {
        content: 'Features',
        contentIndex: 2,
        coordinate: {
          height: 71,
          width: 221,
          x: 236,
          y: 792,
        },
        fontWeight: 'B',
        pageNum: 1,
        sectionIndex: 2,
        type: 'TEXT',
        index: 4,
      },
      selection: {
        start: 26,
        end: 31,
        text: 'A(max',
      },
      text: {
        content: 'Lowpowerdissipation:lcc=1uA(max)atTa=25',
        contentIndex: 2,
        coordinate: {
          height: 34,
          width: 1111,
          x: 236,
          y: 961,
        },
        fontWeight: 'P',
        pageNum: 1,
        sectionIndex: 2,
        type: 'TEXT',
        index: 7,
      },
      aronudTexts: [
        'Lowpowerdissipation:lcc=1u',
        'atTa=25',
      ],
    },
    ruleGrammar: 'TITLE: ("Features");\nTYPE: TEXT;\nBETWEEN: ("Lowpowerdissipation:lcc=1u") <&&> ("atTa=25");\n',
  },
  {
    paramName: 'bb',
    type: 'TABLE',
    rule: {
      title: {
        value: [
          'Operating Ranges',
        ],
        logicalOperator: 'and',
      },
      cols: [
        [
          'U',
        ],
      ],
      rows: [
        [
          '"--一',
        ],
      ],
      conditions: [
        'mnI',
      ],
      commands: [
        'extractNumber,',
        'extractMinNumber',
      ],
    },
    uiSelectInfo: {
      title: {
        content: 'Operating Ranges',
        contentIndex: 3,
        coordinate: {
          height: 71,
          width: 446,
          x: 236,
          y: 825,
        },
        fontWeight: 'B',
        pageNum: 2,
        sectionIndex: 3,
        type: 'TEXT',
        index: 85,
      },
      cell: {
        content: '"',
        contentIndex: 3,
        coordinate: {
          height: 196,
          width: 163,
          x: 1694,
          y: 1291,
        },
        fontWeight: 'P',
        pageNum: 2,
        sectionIndex: 3,
        type: 'TABLE',
        index: 544,
      },
      rows: [
        {
          content: '"--一',
          contentIndex: 3,
          coordinate: {
            height: 196,
            width: 587,
            x: 286,
            y: 1291,
          },
          fontWeight: 'P',
          pageNum: 2,
          sectionIndex: 3,
          type: 'TABLE',
          index: 541,
        },
      ],
      cols: [
        {
          content: 'U',
          contentIndex: 3,
          coordinate: {
            height: 96,
            width: 163,
            x: 1694,
            y: 929,
          },
          fontWeight: 'P',
          pageNum: 2,
          sectionIndex: 3,
          type: 'TABLE',
          index: 521,
        },
      ],
      conditions: [
        {
          cell: {
            content: '”',
            contentIndex: 3,
            coordinate: {
              height: 196,
              width: 230,
              x: 873,
              y: 1291,
            },
            fontWeight: 'P',
            pageNum: 2,
            sectionIndex: 3,
            type: 'TABLE',
            index: 542,
          },
          cols: [
            {
              content: 'mnI',
              contentIndex: 3,
              coordinate: {
                height: 96,
                width: 230,
                x: 873,
                y: 929,
              },
              fontWeight: 'P',
              pageNum: 2,
              sectionIndex: 3,
              type: 'TABLE',
              index: 519,
            },
          ],
        },
      ],
    },
    ruleGrammar: 'TITLE: ("Operating Ranges");\nTYPE: TABLE;\n{\n  rows: [(""--一")],\n  cols: [("U")],\n  conditions: [{rows: [("mnI")]}]\n};\nCOMMAND: (extractNumber,,extractMinNumber);',
  },
];

module.exports = sopRules;
