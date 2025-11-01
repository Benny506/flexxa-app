import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Pressable,
    TextInput,
    Switch,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import ReusableModal from "../../../../components/ReusableModal";
import AppLoading from "../../../../components/loaders/AppLoading";

const DUMMY_GROUP = {
    id: "g1",
    name: "Pool Party Enthusiasts",
    description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora.",
    members: 50,
    owner: {
        name: "John Doe",
        username: "@lifeoftheparty",
        avatar: "https://i.pravatar.cc/100?img=1",
    },
    image: "https://picsum.photos/200",
    media: Array(9).fill("https://picsum.photos/300/300")
};

const GroupInfoScreen = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [notifications, setNotifications] = useState(true);
    const [showExitModal, setShowExitModal] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [showReportSuccess, setShowReportSuccess] = useState(false);
    const [reportReason, setReportReason] = useState("");
    const [reportOther, setReportOther] = useState("");

    const reportOptions = [
        { value: "inappropriate", label: "Inappropriate content" },
        { value: "spam", label: "Spam or misleading" },
        { value: "harassment", label: "Harassment or bullying" },
        { value: "other", label: "Other" },
    ];

    const handleExitGroup = () => {
        setShowExitModal(false);
        setIsExiting(true);

        setTimeout(() => {
            setIsExiting(false);
            router.back();
        }, 2000);
    };

    const handleSubmitReport = () => {
        if (!reportReason) return;

        setShowReportModal(false);
        setShowReportSuccess(true);
        setReportReason("");
        setReportOther("");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={28} color="#000" />
                </Pressable>
                <Text style={styles.headerTitle}>Group info</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Group Image & Info */}
                <View style={styles.groupHeader}>
                    <Image
                        source={{ uri: DUMMY_GROUP.image }}
                        style={styles.groupImage}
                    />
                    <Text style={styles.groupName}>{DUMMY_GROUP.name}</Text>
                    <Text style={styles.membersCount}>{DUMMY_GROUP.members} members</Text>
                </View>

                {/* Description */}
                <Text style={styles.description}>{DUMMY_GROUP.description}</Text>

                {/* Owner */}
                <View style={styles.section}>
                    <View style={styles.ownerRow}>
                        <Image
                            source={{ uri: DUMMY_GROUP.owner.avatar }}
                            style={styles.ownerAvatar}
                        />
                        <View style={styles.ownerInfo}>
                            <Text style={styles.ownerName}>{DUMMY_GROUP.owner.name}</Text>
                            <Text style={styles.ownerUsername}>
                                {DUMMY_GROUP.owner.username}
                            </Text>
                        </View>
                        <View style={styles.ownerBadge}>
                            <Text style={styles.ownerBadgeText}>Owner</Text>
                        </View>
                    </View>
                </View>

                {/* Notifications */}
                <View style={styles.section}>
                    <View style={styles.row}>
                        <Text style={styles.sectionTitle}>Notifications</Text>
                        <Switch
                            value={notifications}
                            onValueChange={setNotifications}
                            trackColor={{ false: "#e0e0e0", true: "#484ED4" }}
                            thumbColor="#fff"
                        />
                    </View>
                </View>

                {/* Exit Group */}
                <Pressable
                    style={styles.actionButton}
                    onPress={() => setShowExitModal(true)}
                >
                    <Text style={styles.actionText}>Exit group</Text>
                </Pressable>

                {/* Report Group */}
                <Pressable
                    style={styles.actionButton}
                    onPress={() => setShowReportModal(true)}
                >
                    <Text style={styles.actionText}>Report group</Text>
                </Pressable>

                {/* Media */}
                <View style={styles.section}>
                    <View style={styles.mediaHeader}>
                        <Text style={styles.sectionTitle}>Media</Text>
                        <Text style={styles.mediaCount}>55</Text>
                    </View>
                    <View style={styles.mediaGrid}>
                        {DUMMY_GROUP.media.map((url, index) => (
                            <Image
                                key={index}
                                source={{ uri: `${url}${index}` }}
                                style={styles.mediaItem}
                            />
                        ))}
                    </View>
                    <Pressable style={styles.seeAllButton}>
                        <Text style={styles.seeAllText}>See all</Text>
                    </Pressable>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>

            {/* Exit Group Modal */}
            <ReusableModal
                visible={showExitModal}
                onClose={() => setShowExitModal(false)}
                title="Exit Group?"
                message="Are you sure you want to leave this group? You'll no longer have access to posts, updates, or discussions from this group."
                primaryButton={{
                    text: "Confirm Exit",
                    onPress: handleExitGroup,
                }}
                secondaryButton={{
                    text: "Cancel",
                    onPress: () => setShowExitModal(false),
                }}
            />

            {/* Exiting Loader */}
            <AppLoading tempLoading={isExiting} loadingText="Exiting group..." />

            {/* Report Group Modal */}
            <ReusableModal
                visible={showReportModal}
                onClose={() => setShowReportModal(false)}
                title="Report Group"
                message="Help us understand the issue. Why are you reporting this group? Choose a reason below."
            >
                <View style={styles.reportOptions}>
                    {reportOptions.map((option) => (
                        <Pressable
                            key={option.value}
                            style={styles.reportOption}
                            onPress={() => setReportReason(option.value)}
                        >
                            <Text style={styles.reportLabel}>{option.label}</Text>
                            <View
                                style={[
                                    styles.radio,
                                    reportReason === option.value && styles.radioSelected,
                                ]}
                            >
                                {reportReason === option.value && (
                                    <View style={styles.radioInner} />
                                )}
                            </View>
                        </Pressable>
                    ))}

                    {reportReason === "other" && (
                        <TextInput
                            style={styles.reportInput}
                            placeholder="Input other reason"
                            placeholderTextColor="#999"
                            value={reportOther}
                            onChangeText={setReportOther}
                            multiline
                        />
                    )}
                </View>

                <View style={styles.reportButtons}>
                    <Pressable
                        style={styles.reportSecondary}
                        onPress={() => setShowReportModal(false)}
                    >
                        <Text style={styles.reportSecondaryText}>Cancel</Text>
                    </Pressable>
                    <Pressable
                        style={[
                            styles.reportPrimary,
                            !reportReason && styles.reportDisabled,
                        ]}
                        onPress={handleSubmitReport}
                        disabled={!reportReason}
                    >
                        <Text style={styles.reportPrimaryText}>Submit Report</Text>
                    </Pressable>
                </View>
            </ReusableModal>

            {/* Report Success Modal */}
            <ReusableModal
                visible={showReportSuccess}
                onClose={() => setShowReportSuccess(false)}
                title="Report Submitted!"
                message="Thank you for helping us maintain a safe community. Our team will review your report and take the appropriate action."
                primaryButton={{
                    text: "Close",
                    onPress: () => setShowReportSuccess(false),
                    backgroundColor: 'transparent',
                    style: { borderWidth: 1, borderColor: '#484ED4' },
                    textColor: '#484ED4',
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#fff" },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    headerTitle: { fontSize: 18, fontWeight: "600", color: "#000" },
    content: { flex: 1 },
    groupHeader: { alignItems: "center", paddingVertical: 24 },
    groupImage: { width: 120, height: 120, borderRadius: 10 },
    groupName: { fontSize: 20, fontWeight: "700", color: "#000", marginTop: 16 },
    membersCount: { fontSize: 14, color: "#999", marginTop: 4 },
    description: {
        fontSize: 14,
        color: "#666",
        lineHeight: 20,
        paddingHorizontal: 24,
        // textAlign: "center",
        marginBottom: 24,
    },
    section: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: "#f5f5f5",
    },
    ownerRow: { flexDirection: "row", alignItems: "center" },
    ownerAvatar: { width: 48, height: 48, borderRadius: 24 },
    ownerInfo: { flex: 1, marginLeft: 12 },
    ownerName: { fontSize: 15, fontWeight: "600", color: "#000" },
    ownerUsername: { fontSize: 13, color: "#999", marginTop: 2 },
    ownerBadge: {
        backgroundColor: "#E8E8FF",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    ownerBadgeText: { fontSize: 12, fontWeight: "600", color: "#5B5BFF" },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    sectionTitle: { fontSize: 15, fontWeight: "600", color: "#000" },
    actionButton: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: "#f5f5f5",
    },
    actionText: { fontSize: 15, color: "#000" },
    mediaHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    mediaCount: { fontSize: 14, color: "#999" },
    mediaGrid: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
    mediaItem: { width: "32.5%", height: 100, borderRadius: 8 },
    seeAllButton: { alignItems: "flex-end", marginTop: 12 },
    seeAllText: { fontSize: 14, color: "#5B5BFF", fontWeight: "600" },
    reportOptions: { width: "100%", marginBottom: 20 },
    reportOption: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    reportLabel: { fontSize: 15, color: "#000" },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#ddd",
        justifyContent: "center",
        alignItems: "center",
    },
    radioSelected: { borderColor: "#5B5BFF" },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#5B5BFF",
    },
    reportInput: {
        borderWidth: 1,
        borderColor: "#e0e0e0",
        borderRadius: 8,
        padding: 12,
        marginTop: 12,
        fontSize: 14,
        color: "#333",
        minHeight: 80,
        textAlignVertical: "top",
    },
    reportButtons: { flexDirection: "row", gap: 12, width: "100%" },
    reportSecondary: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#484ED4",
        alignItems: "center",
    },
    reportSecondaryText: { fontSize: 16, fontWeight: "600", color: "#484ED4" },
    reportPrimary: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: "#484ED4",
        alignItems: "center",
    },
    reportDisabled: { backgroundColor: "#D0D0FF" },
    reportPrimaryText: { fontSize: 16, fontWeight: "600", color: "#fff" },
});

export default GroupInfoScreen;
