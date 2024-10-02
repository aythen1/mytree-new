import { View, Text, Dimensions, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { Image } from "expo-image";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Context } from "../context/Context";
import { useDispatch, useSelector } from "react-redux";
import {
  dislikeComment,
  getAllCommentsByPostId,
  likeComment,
  updateCommentById,
} from "../redux/actions/comments";

const SingleComment = ({
  image,
  author,
  comment,
  createdAt,
  responses,
  response,
  commentId,
  creatorId,
  likes,
  dislikes,
}) => {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.users);
  const {
    selectedPost,
    setResponseTo,
    formatDateDifference,
    userData,
    setSelectedComment,
    showResponses,
    sortByDate,
    setShowResponses,
  } = useContext(Context);

  const handleLike = () => {
    if (dislikes.includes(userData.id.toString())) {
      dispatch(
        dislikeComment({
          commentId,
          body: { dislikes: [userData.id.toString()] },
        }),
      );
    }
    dispatch(
      likeComment({ commentId, body: { likes: [userData.id.toString()] } }),
    ).then((data) => dispatch(getAllCommentsByPostId(selectedPost)));
  };

  const handleDislike = () => {
    if (likes.includes(userData.id.toString())) {
      dispatch(
        likeComment({ commentId, body: { likes: [userData.id.toString()] } }),
      );
    }
    dispatch(
      dislikeComment({
        commentId,
        body: { dislikes: [userData.id.toString()] },
      }),
    ).then((data) => dispatch(getAllCommentsByPostId(selectedPost)));
  };
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 22,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          width: "100%",
          gap: 20,
        }}
      >
        <Image
          style={{ width: 30, height: 30, borderRadius: 50, marginTop: 5 }}
          contentFit="cover"
          contentPosition={"center"}
          source={image ? { uri: image } : require("../assets/logoo.png")}
        />
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "center",
            gap: 6,
            width: Dimensions.get("screen").width - 100,
          }}
        >
          <Text
            style={{
              color: "#787878",
              fontSize: 12,
              fontWeight: "500",
              width: "80%",
            }}
          >
            {author}
          </Text>
          <Text
            style={{
              color: "#4F5660",
              fontSize: 14,
              fontWeight: "500",
              marginTop: -7,
              maxWidth: "90%",
            }}
          >
            {comment}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: response
                ? Dimensions.get("screen").width - 124
                : Dimensions.get("screen").width - 92,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 20 }}
            >
              <Text
                style={{ color: "#787878", fontSize: 11, fontWeight: "500" }}
              >
                {formatDateDifference(createdAt)}
              </Text>
              {!response && (
                <Pressable
                  onPress={() => {
                    setSelectedComment(commentId);
                    setResponseTo(
                      allUsers.filter(
                        (user) => user.id.toString() === creatorId,
                      )[0],
                    );
                  }}
                >
                  <Text
                    style={{
                      color: "#787878",
                      fontSize: 11,
                      fontWeight: "500",
                    }}
                  >
                    {"Responder"}
                  </Text>
                </Pressable>
              )}
            </View>
          </View>

          {!response && (
            <Pressable
              disabled={responses?.length === 0}
              onPress={() => setShowResponses(!showResponses)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
              }}
            >
              <View
                style={{
                  width: 30,
                  borderBottomWidth: 0.5,
                  borderBottomColor: "#787878",
                }}
              ></View>
              <Text
                style={{ color: "#787878", fontSize: 11, fontWeight: "500" }}
              >{`Ver ${responses?.length} respuestas`}</Text>
            </Pressable>
          )}
        </View>
      </View>
      <View
        style={{
          gap: 5,
          paddingLeft: 15,
          marginTop: 10,
          alignSelf: "flex-start",
        }}
      >
        {showResponses &&
          responses &&
          sortByDate(responses).map((comment, index) => (
            <SingleComment
              key={index}
              commentId={comment?.id || ""}
              response={true}
              image={comment?.user?.profilePicture}
              createdAt={comment?.createdAt || new Date()}
              creatorId={comment?.creatorId || ""}
              dislikes={comment?.dislikes || []}
              likes={comment?.likes || []}
              comment={comment?.content}
              author={comment?.user?.username + " " + comment?.user?.apellido}
            />
          ))}
      </View>
    </View>
  );
};

export default SingleComment;
