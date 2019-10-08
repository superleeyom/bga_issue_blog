import 'package:bga_issue_blog/utils/constants.dart';
import 'package:bga_issue_blog/widget/issue_list.dart';
import 'package:bga_issue_blog/widget/label_list.dart';
import 'package:bga_issue_blog/widget/left_widget.dart';
import 'package:bga_issue_blog/widget/search_layout.dart';

import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  HomePage({Key key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(Constants.gitHubUsername),
        backgroundColor: Colors.lightGreen,
      ),
      body: Row(
        children: <Widget>[
          Expanded(flex: 1, child: LeftWidget()),
          VerticalDivider(width: 1),
          Expanded(
              flex: 3,
              child: Column(
                children: [
                  LabelList(),
                  Expanded(child: IssueList()),
                  SearchLayout(),
                ],
              ))
        ],
      ),
    );
  }
}